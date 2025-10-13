/**
 * Express router for comment-related API endpoints.
 *
 * @module routes/api/comments
 * @requires express.Router
 * @requires mongoose.model
 *
 * Routes:
 *   GET / - Retrieve all Comment documents.
 *     - Success: 200 JSON Array of comments.
 *     - Error: 500 JSON { error: string } on server error.
 *
 *   POST / - Create a new Comment from request body.
 *     - Request body: JSON matching the Comment schema.
 *     - Success: 201 JSON of the saved comment.
 *     - Error: 400 JSON { error: string } on validation/bad request.
 *
 *   DELETE /:id - Delete a Comment by its id.
 *     - Path param: id (string) - Comment ObjectId.
 *     - Success: 200 JSON { message: "Comment deleted successfully" }.
 *     - Error: 404 JSON { error: "Comment not found" } if no matching document.
 *     - Error: 500 JSON { error: string } on server error.
 *
 * Notes:
 *   - Uses mongoose.model("Comment") to interact with the database.
 *   - All responses use JSON content type.
 *
 * Exports:
 *   - module.exports = router (an Express Router instance with the above routes)
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
// Hey GitHub Copilot, please help me write the routes for comments
router.get(`/`, async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post(`/`, async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// add another endpoint for deleting a comment
router.delete(`/:id`, async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});