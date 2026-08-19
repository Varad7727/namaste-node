const mongoose=require("mongoose");
const {Schema}=mongoose;

const problemSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    difficulty:{
        type:String,
        enum:[Easy,Medium,Hard],
        required:true,
    },
    tags: {
    type: [String],
    enum: [
        "Array",
        "String",
        "Hash Table",
        "Linked List",
        "Stack",
        "Queue",
        "Heap",
        "Binary Search",
        "Two Pointers",
        "Sliding Window",
        "Prefix Sum",
        "Greedy",
        "Recursion",
        "Backtracking",
        "Tree",
        "Binary Tree",
        "BST",
        "Graph",
        "DFS",
        "BFS",
        "Trie",
        "Dynamic Programming",
        "Bit Manipulation",
        "Math",
        "Sorting",
        "Matrix",
        "Monotonic Stack",
        "Union Find",
        "Topological Sort",
        "Segment Tree",
        "Fenwick Tree"
    ],
    required: true,
},
visibleTestCases:[
    //there may be ,ullti cases so array
    {
        input:{
            type:String,
            required:true,
        },
        output:{
            type:String,
            required:true,
        },
        explanation:{
            type:String,
            required:true,
        },
    }
],
inVisibleTestCases:[
    //there may be mullti cases so array
    {
        input:{
            type:String,
            required:true,
        },
        output:{
            type:String,
            required:true,
        },
    }
],
initialCode:[
    {
        language:{
            type:String,
            required:true,
        },
        initialCode:{
            type:String,
            required:true,
        },
    }
],
problemCreator:{
    type:Schema.Types.ObjectId,
    ref:"user",
    required:true,
}

})

const Problem=mongoose.model('problem',problemSchema);
module.exports=Problem;