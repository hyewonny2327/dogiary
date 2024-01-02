import { api } from './api';

//유저 조회 Api
export const userIdRead = async () => {
  try {
    const response = await api.get('/auth/my-page');

    const { userId, nickName, email, imageUrl } = response.data.data;
    return { userId, nickName, email, imageUrl };
  } catch (err) {
    console.error('에러', err);
  }
};

//닉네임 중복확인 Api
export const nicknameCheck = async (nickName) => {
  try {
    const response = await api.post('/auth/check-nickname', { nickName });

    return response.data.data;
  } catch (error) {
    console.error('중복 닉네임:', error);
  }
};

//현재 비밀번호 Api

export const PasswordCheck = async (password) => {
  try {
    const response = await api.post('/auth/check-password', { password });

    return response.data.data;
  } catch (error) {}
};

//수정하기 Api
export const userInformationUpdate = async (nickName, password, file) => {
  try {
    const formData = new FormData();
    formData.append('nickName', nickName);
    formData.append('password', password);
    if (file instanceof File) {
      formData.append('imageUrl', file);
    }

    const response = await api.put('/auth/my-page', formData);

    return response.data.data;
  } catch (error) {
    console.error('Error during update:', error);
  }
};
