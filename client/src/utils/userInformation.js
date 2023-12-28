import axios from 'axios';

const userTokenValue = localStorage.getItem('userToken');

//유저 조회 Api
export const userIdRead = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/auth/my-page', {
      headers: {
        Authorization: `Bearer ${userTokenValue}`,
        'Content-type': 'application/json',
      },
    });

    const { userId, nickName, email, imageUrl } = response.data.data;
    return { userId, nickName, email, imageUrl };
  } catch (err) {
    console.error('에러', err);
  }
};

//닉네임 중복확인 Api
export const nicknameCheck = async (nickName) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/auth/check-nickname',
      { nickName },
    );

    return response.data.data;
  } catch (error) {
    console.error('중복 닉네임:', error);
  }
};

//현재 비밀번호 Api

export const PasswordCheck = async (password) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/auth/check-password',
      { password },
      {
        headers: {
          Authorization: `Bearer ${userTokenValue}`,
          'Content-type': 'application/json',
        },
      },
    );

    return response.data.data;
  } catch (error) {
    console.error('비밀번호 확인 오류:', error);
  }
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

    const response = await axios.put(
      'http://localhost:8080/api/auth/my-page',
      formData,
      {
        headers: {
          Authorization: `Bearer ${userTokenValue}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data.data;
  } catch (error) {
    console.error('Error during update:', error);
  }
};

//탈퇴하기Api
export const userSecession = async () => {
  try {
    const response = await axios.delete(
      'http://localhost:8080/api/auth/my-page',
      {
        headers: {
          Authorization: `Bearer ${userTokenValue}`,
          'Content-type': 'application/json',
        },
      },
    );
    return true;
  } catch (error) {
    console.error('비밀번호 확인 오류:', error);
  }
};
