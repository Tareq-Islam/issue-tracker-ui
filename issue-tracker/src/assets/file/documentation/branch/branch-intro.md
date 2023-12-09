The branch permission section helps you manage branches and control the custodians of branches who can access KMS application. If you don't assign a custodian to a branch level, they won't be able to log in. Branch levels work with user ```Role```, which are used to limit what custodians can do and see. Role rights let you control whether a custodian can view, delete, export, or change sensitive data. The branch permission system operates in a ```Hierarchical Model```. There are 3 levels of branch hierarchy.
These are -


- ***Global*** </br>
    Global level custodians has access of all sites.
- ***Cluster*** </br>
    Cluster level custodians has access in selected cluster level sites.
- ***Zone*** </br>
    Zone level custodians has access in selected zone level sites.


 Using ```Branch Permission``` section you can take the following action -
1. Create or Edit Child Branch
2. Enable or Disable key Request
3. Assign or remove custodian in branch level
4. Assign or remove asset<sup>[1]</sup> in branch according to branch level

---
1. Asset = Site or Zone or Cluster