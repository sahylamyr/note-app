import Joi from "joi"


const storeNoteValidate = Joi.object({
    title: Joi.string().required().min(3).max(100),
    body: Joi.string().required().min(3)
})

const updateNoteValidate = Joi.object({
    title: Joi.string().required().min(3).max(100),
    body: Joi.string().required().min(3)
})

export {
    storeNoteValidate,
    updateNoteValidate
}