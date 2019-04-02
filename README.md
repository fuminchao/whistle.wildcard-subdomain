## Whistle Plugin to resolve wildcard subdomains

### Installation
This module have not been published to npmjs, so please install by ```npm install -g https://github.com/fuminchao/whistle.wildcard-subdomain.git```

### E.g
```
 a.b.c.d.www.a.com  # if Unknown
=> b.c.d.www.a.com  # if Unknown
===> c.d.www.a.com  # if Unknown
====>  d.www.a.com  # if Unknown
======>  www.a.com  $ Got it. Then all the above host will be resolved
```