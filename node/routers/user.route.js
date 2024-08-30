import express from 'express';
import { createUser, deleteUser, getUser, getUserById, updateUser, uploadProfile } from '../controllers/user.controller.js';
import upload from '../middleware/multerconfig.js';

const router = express.Router();

router.post('/user', createUser);
router.get('/user', getUser);
router.get('/user/:user_id', getUserById);
router.put('/user/:user_id', updateUser);
router.delete('/user/:user_id', deleteUser);
router.post('/upload-profile', upload.single('profile'), uploadProfile);


export default router;