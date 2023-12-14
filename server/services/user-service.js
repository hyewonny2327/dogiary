import { User } from "../models/user-model";

export default class UserService {
    
    //회원가입
    async Signup({user_email, user_id, nickname, password}) {
        const user = {user_email, user_id, nickname, password};

        try{
            const exist_user = await User.findOne({user_id: user.user_id});
            if(exist_user !== null) {
                return {message : "이미 존재하는 아이디입니다."};
            }
            const new_user = await User.create(user);
            return {message: "회원가입 성공"};
        } catch(err) {
            return err;  
        }
    }
}