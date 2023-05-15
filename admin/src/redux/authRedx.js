import jwt_decode from "jwt-js-decode"

if(token) {
    try {
      const jwt_decoded = jwt_decode(token)
      const timeToExpire = jwt_decoded.exp - Date.now()
      if(timeToExpire > 0) {
        setTimeout(() => {
          // dispatch action to logout
        }, timeToExpire);
        initialState.token = token;
      } 
    } catch (error) {
      console.log("error parsing token")
    }
  }
  