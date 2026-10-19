const express = require('express');
const { registerUser, loginUser, addUser, updateUser, getAllUsers, getUserById, deleteUser, getTotalUser, getProfile, updateProfile } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post("/login", loginUser);
router.post("/addusers", addUser);
router.get("/count", getTotalUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/profile/:id", getProfile);
router.put("/profile/:id", updateProfile);
router.get("/", getAllUsers);


module.exports = router;
