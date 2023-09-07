const useLogin = async (url, Email, Pass) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: Email,
          password: Pass,
          returnSecureToken: true,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
  
      const data = await response.json();
      const idToken=data.idToken;
      const localId=data.localId;
      const email=data.email
      console.log(email)
      return {idToken,localId,email};
    } catch (err) {
      throw err;
    }
  };
  
  export default useLogin;
  