import axios from 'axios';

//! 구현 진행중 ... 
export async function callRegisterPlaceApi(){
    try{
        // const body = {
        //     "title": "제목",
        //     "toggle": true,
        //     "tag": [filter],
        //     "content": text,
        //     "image_url": imgSrc,
        //     "position": [lng, lat],
        //     "address": address
        // }
        const body = {
            "title": "제목",
            "toggle": true,
            "tag": ['ttt'],
            "content": '안녕',
            "imageUrl": '이미지경로',
            "position": [38, 29],
            "address": '주소'
        }

        await axios.post('http://localhost:8080/api/maps',body);
        console.log('테스트 성공' )
    }catch(error){
        console.log('registerPlace api 오류',error);
    }
}