import express from 'express'
import { index, show, store, trash, update } from '../controllers/noteController.js'

const router = express.Router()

router.get('/', index)
router.get('/:id', show)
router.put('/:id', update)
router.post('/', store)
router.delete('/:id', trash)


export default router;