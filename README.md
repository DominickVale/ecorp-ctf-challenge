
# Setup
### DEV
```bash
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create main_network #(if you change this also change the name in the Dockerfiles)

yarn setup # (if first time)
# enter container terminal
docker exec -it ecorp-ctf-challenge-web-1 sh
# inside container terminal
yarn db-bootstrap
```

# Meta

**Estimated difficulty**: Easy

**Theme**: An evil corporation (Neuratap) (bootleg evil neuralink) is an emerging corporation that produces brain-machine interfaces boasting about privacy, security and clients well-being on top of everything else.
    But word got out that they run malware on their neuratap implants, stealing data by deciphering sensory inputs and accessing sensitive data,
    along with manipulating their victims' thoughts to convince everyone they know to buy a neuratap too. They must be stopped before they infect too many people... Word got out that they have an entire c2 dashboard exposed on their clearnet website!


**Tags**: reconnaissance, graphql, enumeration, robots.txt, unchecked jwt signature, minified source code inspection

**Design**: cyberpunk-like, futuristic user interface.

**Design inspiration**: 
    - [FUI MoodBoard](https://www.behance.net/collection/203026051/FUI)

**Objectives**:
- [ ] Reconnaissance: find dashboard username to log into. It's going to be in a screenshot in one of the blog posts.
- [x] find hidden dashboard: on url /c2/panel by checking the robots.txt (the file will be spammed with entries to make it harder to find, player will either just wing it or use burp suite to test the paths for the only ones that don't 404, the list is short, so they don't dos us lol)
- [x-ish] the dashboard will have a user agent filter. Player will need to spoof it. They'll get the user agent either from more reconnaissance or by sending a malicious link in a message in the contact-us section.
  The server will make a request with the needed user agent to fake an employer clicking on the link.
- [done server - todo client] once the dashboard is accessed, the player will need to intercept graphql requests and play with mutation names to find the right ones by enumerating the schema via typos (introspection disabled, but suggestions enabled)...
   Of course the guesses will be easy (login, registerStaffUser etc). The register mutation will require an apikey, which can be found somewhere in the client minified source code.
    They'll be able to register a default staff user from which they can then log in to and explore the dashboard.
- [ ] unprotected endpoint: the player should've noticed by now the "level" field inside the login/register query response and change it to level=1 (all permissions),<br/>
  this will set the player to admin on client side so that they can explore the admin dashboard.<br/> Once they find the admin utilities, they'll need to tamper with their jwt token to set the "level" there as well.
  On the admin dashboard, they'll find a button that will then make a request to /c2/dashboard/p4n1c that safely removes the malware from victim's neurotaps if the jwt contains the admin role.
- [ ] bonus point if they also find a way to erase all the users data (the deleteClientData mutation will accept an array of ids, which they can get through the getClientsList query)

The graphql endpoint will have both graphiql playground and introspection disabled to make it not solvable in 2 minutes. They'll need to work with error messages / suggestions.

The objectives might change slightly as I design it further but this should be the gist of it. It might end up being slightly easier or slightly harder depending on the dashboard design :)

**Flags**:
- on dashboard login (will be set as a cookie)
- on dashboard admin mode (will show up somewhere easy to spot on the dashboard)
- on successful request sent to p4n1c

Useful links
- https://github.com/dolevf/Damn-Vulnerable-GraphQL-Application
- https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html
- https://youtu.be/NPDp7GHmMa0
- https://www.apollographql.com/blog/graphql/security/securing-your-graphql-api-from-malicious-queries/
- https://book.hacktricks.xyz/pentesting-web/hacking-jwt-json-web-tokens#tamper-data-without-modifying-anything
