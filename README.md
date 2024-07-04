# Tree UI

## How to run 

* Run `docker build .` to build the image.
* Run `docker run -p 3000:3000 <imagetag or imageid>`

## Technology

* NextJS
* Bootstrap
* react

## Tree Balancing Algorithm
It is using a balanced BST approach. Internally after generating the tree , it is converted to a sorted list and we make the mid element root. This makes it balance.
A stronger approach might have been to use some self balancing tree like AVL. 

## Backend 

Let's walk through different DBs available and see their feasibility
* In memory

We can move to a B-Tree or B+ Tree datastructure which attempts to keep the leaf node in a same depth . The rate of increasing the depth of the tree will be much slower. 

* RDBMS

   - We can use JSONB column type with GIN index.
   - We can add an tree_id column to identify the tree.
   - Each balance is an update. Based on scenario we can either full update or patch. 

* NoSql 
  -  Moving to NoSql like mongo make sense when we have complex queries, aggregates or we have high amount of load. 
  - From the problem it is not clear how much load is expected so without that moving to NoSQL is premature . 
  - We will also need devs who knows Mongo to operate it. 

  * Graph DB 

  Trees are fundamentally acyclic unidirectional graph. We can opt for Graph based DB like Neo4j. 
  Now this move will only be justified if we have a requirment to preserve the relationship. GraphDBs has relationship as a first class citizen and we can quickly go bidirectional and also find sibling relationships. 

## Conclusion
  Given this particular scope of the work and with many unknowns like scaling requirement, relationship requirement I will still start with Postgres and JSONB datastructure and switch to other solution only if it requires. 