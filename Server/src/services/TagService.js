const { asyncErrCatch }  = require('../unit/asyncErrCatch')

const TagApi = require('../db/api/TagApi')
const ErrorTypeMixin = require('../unit/errorHandel/errorCodeMinxi')
const { UserErrHandel } = require('../unit/errorHandel/errHandel')
const code = require('../config/code')
const TagService = {}

TagService.createTag = async (ctx,Tra,Name) => {
    try {
        const TagValue = {
            Name:Name,
            Target:Name,
            Icon:null
        }
        let TagModel = await TagApi.getTagByName(Name,Tra,true)
        if (TagModel){
            UserErrHandel(ctx,400,code.TAG_RECREATE,'已经拥有这个标签！')
        }
        TagModel = await TagApi.createTag(TagValue,Tra)
        return TagModel
    }
    catch (e) {
        throw e
    }
}

TagService.getAllTag = async (ctx,Tra,ShowDelete) => {
    const [Err,Tags] = await asyncErrCatch(TagApi.getAllTag(Tra,ShowDelete))
    if (Err){
        throw Err
    }
    return Tags
}

TagService.getTag = async(ctx,Tra,index,ShowDelete) => {
    let Tag
    try {
        if (typeof index === 'number'){
             Tag = await TagApi.getTagByID(index,Tra,ShowDelete)
        }
        else {
             Tag = await TagApi.getTagByName(index,Tra,ShowDelete)
        }
        if (!Tag){
            UserErrHandel(ctx,404,-1,'没有找到这个标签！')
        }
        return Tag
    }catch (e) {
        throw e
    }
}

TagService.deleteTag = async (ctx,Tra,Name) => {
    try {
        const isForce = !!ctx.request.body.force
        console.log(isForce)
        let Tag = await TagService.getTag(ctx,Tra,Name,true)
        Tag = await TagApi.deleteTag(Tag,Tra,isForce)
        return Tag
    }catch (e) {
        throw e
    }
}
TagService.restoreTag = async (ctx,Tra,Model) => {
    try {
        return await TagApi.restoreTag(Model, Tra)
    }
    catch (e) {
        throw e
    }
}


module.exports = TagService