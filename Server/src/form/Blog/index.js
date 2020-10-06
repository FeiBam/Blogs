import BaseForm from "../BaseForm";
import BlogDB from '../../db'
import ArticleService from '../../services/ArticleService'
import errCode from '../../config/code'

export default class BlogForm extends BaseForm{
    async getPage(PageNum = 1) {
        let eCode = null
        const Transaction = await BlogDB.transaction()
        let Articles = []
        try {
            Articles = await ArticleService.getPage(PageNum)
            const ObjectRe = {
                dataValues:{
                    id:'',
                    updatedAt:'',
                    onDelete:'',
                    AccountId:'',
                    Account:{
                        PassWord:''
                    }
                }
            }
            Articles.forEach(item=>{
                ObjectRemove(item,ObjectRe)
            })
            await Transaction.commit()
            return {Articles,errCode}
        }
        catch (err) {
            await Transaction.rollback()
            eCode = errCode.ARTICLE.ARTICLE_NOT_FOUND
            return {Articles,eCode}
        }
    }
}
