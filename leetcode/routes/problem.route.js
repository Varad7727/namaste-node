const express=require("express");
const problemRouter=express.Router();

//create
problemRouter.post("/create",problemCreate);
//fetch
problemRouter.get("/:id",problemFetch);
problemRouter.get("/",getAllProblem);
//upate
problemRouter.patch("/:id",problemUpdate);
//delete
problemRouter.delete("/:id",problemDelete);
problemRouter.get("/user",solvedProblem);



 