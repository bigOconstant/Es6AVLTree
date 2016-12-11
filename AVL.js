/* AVL Self balancing Tree Example */


class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
        
    }
    toString() {
        JSON.stringify(this);

    }

    insert(node) {
        if (this.value === node.value) {
            console.log("No duplicates allowed");

        }
        if (node == null) {
            return false;
        } else if (node.value < this.value) {
            if (this.left == null) {
                console.log("Inserting Left Leaf");
                this.left = node;
                return true;

            } else {
                console.log("<--^");
                node.parent = this.left;
                this.left.insert(node);

            }
        } else {
            if (this.right == null) {
                console.log("Inserting Right Leaf");
                this.right = node
                return true;
            } else {
                console.log("^-->");
                node.parent = this.right;
                this.right.insert(node);

            }

        }


    }


}



class AVLTree {
    constructor(node) {
        this.root = node;
    }

    balanceTree(node) {


        var left = 0;
        var right = 0;
        if (node.left != null) {
            ++left;
        }
        if (node.right != null) {
            ++right;
        }
        if ((node.left != null && node.left.left != null) || node.left != null && node.left.right != null) {
            ++left;
        }
        if ((node.right != null && node.right.left != null) || (node.right != null && node.right.right != null)) {
            ++right;
        }

        if (left - right > 1 || right - left > 1) {
            console.log("Rebalancing Tree");
            if (node.left != null && node.left.left !== null) {
                console.log(" left left rebalance");
                var left = new Node(node.left.value);
                var leftLeft = new Node(node.left.left.value);
                var placeHolder = node.value;
                node.value = left.value;
                node.right = new Node(placeHolder);
                node.right.parent = node;
                node.left = leftLeft;
                console.log("Tree has been Rebalanced");

            } else if (node.left != null && node.left.right != null) {
                console.log("left right rebalance ");
                var right = new Node(node.left.right.value);
                var left = new Node(node.left.value);
                //switch left and sub right to make this a left left and reinsert
                node.left = right;
                right.insert(left);
                this.balanceTree(node);

            } else if (node.right != null && node.right.right != null) {
                console.log("right right rebalance");
                var right = new Node(node.right.value);
                var rightRight = new Node(node.right.right.value);
                var temp = node.value;
                node.value = right.value;
                node.left = new Node(temp);
                node.left.parent = node;
                node.right = rightRight;
                console.log("Tree has been rebalanced");


            } else if (node.right != null && node.right.left != null) {
                console.log("right left rebalance");

                var right = new Node(node.right.value);
                var left = new Node(node.right.left.value);
                node.right = left;
                node.right.insert(right);
                //Now we need to call right right!
                this.balanceTree(node);


            }


        }

        if (node.left != null) {
            this.balanceTree(node.left);
        }
        if (node.right != null) {
            this.balanceTree(node.right);
        }


    }


    insert(node) {
        console.log("Inserting " + node.value);

        this.root.insert(node);
        this.balanceTree(this.root);
        // check if rebalance is needed. i.e. right left and right sub tree has a difference greator than 1. 



    }
    toString(node) {
        JSON.stringify(node);
    }


    dfs(node, value) {

        if (node != null && value != null) {
            console.log("node.value = " + node.value);
            if (node.parent != null) {
               
               
            }
            if (node.value === value) {
                console.log("Found value");


            } else {
                if (node.left != null) {
                    this.dfs(node.left, value);
                }
                if (node.right != null) {
                    this.dfs(node.right, value);
                }
            }


        }

    }
    findWithDfs(node) {
        this.dfs(this.root, node.value);

    }




}

var j = new Node(5);
var n = new Node(9);
var avl = new AVLTree(n);
var a = new Node(2);
var b = new Node(3);
var c = new Node(11);
var d = new Node(10);


avl.insert(a);
avl.insert(b);
avl.insert(c);
avl.insert(d);

/*     
Visual of test inserts

        First insert 
          9            
    	 /
		2

        Second insert
          9            
         /
		2
		 \
		  3

         After left right rebalance
		  9
		 /
		3
       /
	  2

    After left left rebalance
	  3
	 / \
	2   9
  
    Third insert
      3
	 / \
	2   9
	     \
		 11
		
    Fourth insert

      3
	 / \
	2   9
	     \
		 11
		/
	   10

	After right left rebalance 

	  3
	 / \
	2   9
	     \
		 10
		   \
	        11

	After right right rebalance		

	  3
	 / \
	2   10
	    / \
	   11  9
		   		

		 				*/