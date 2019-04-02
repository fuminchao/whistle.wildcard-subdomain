## Whistle Plugin to resolve wildcard subdomains

### E.g
 a.b.c.d.www.a.com  # if Unknown  
=> b.c.d.www.a.com  # if Unknown  
===> c.d.www.a.com  # if Unknown  
====>  d.www.a.com  # if Unknown  
======>  www.a.com  $ Got it. Then all the above host will be resolved