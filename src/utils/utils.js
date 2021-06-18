// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');
// const jwtPrivate = require('../config/env/JWTPrivate');

// const CRYPTO_ITERATIONS = 103050;   // 반복횟수
// const CRYPTO_KEYLEN = 64;           // 암호 길이
// const CRYPTO_HASH = 'sha512';       // 암호 길이
// const CRYPTO_ENCODE = 'base64';       // 암호 길이

module.exports = {
    // crytoUtils: {
    //     /**
    //      * password 암호화 하여 salt와 함께 반환
    //      * @param {String} password 
    //      * @returns {Promise} resolve : {password, salt}
    //      */
    //     getPasswordAndSalt: (password) => {
    //         return new Promise((resolve, reject) => {
    //             let result = {};

    //             crypto.randomBytes(CRYPTO_KEYLEN, (error, buffer) => {
    //                 if (error) reject(error);

    //                 crypto.pbkdf2(password, buffer.toString(CRYPTO_ENCODE), CRYPTO_ITERATIONS, CRYPTO_KEYLEN, CRYPTO_HASH, (error, key) => {
    //                     if (error) reject(error);
                        
    //                     result.password = key.toString(CRYPTO_ENCODE);
    //                     result.salt = buffer.toString(CRYPTO_ENCODE);

    //                     resolve(result);
    //                 });
    //             });
    //         });
    //     },
    //     /**
    //      * 비밀번호 같은지 여부 확인
    //      * @param {String} input_password 입력한 비밀번호
    //      * @param {String} passowrd 기존 비밀번호
    //      * @param {String} salt 기존 salt
    //      * @returns {Boolean} 비밀번호 같은지 여부
    //      */
    //     isPasswordSame: (input_password, password, salt) => {
    //         return new Promise((resolve, reject) => {
    //             crypto.pbkdf2(input_password, salt, CRYPTO_ITERATIONS, CRYPTO_KEYLEN, CRYPTO_HASH, (error, key) => {
    //                 if (error) reject(error);

    //                 if (key.toString(CRYPTO_ENCODE) === password) resolve(true);
    //                 else resolve(false);
    //             });
    //         });
    //     }
    // },
    // jwtUtils: {
        
    //     /**
    //      * 토큰 발급
    //      * @param {Object} data 
    //      * @returns 
    //      */
    //     createJwtToken: (data) => {
    //         if (!data) return null;

    //         let payload = {
    //             payload: data
    //         };

    //         const TIMEOUT = '7d';

    //         try {
    //             // jwt.sign(데이터, 암호화키(private), 유효기간)
    //             let token = jwt.sign(
    //                 payload,
    //                 jwtPrivate.secret,
    //                 { expiresIn: TIMEOUT }
    //             );
    //             // 토큰 반환
    //             return token;
    //         } catch(error) {
    //             throw new Error('Error occurred While Create Token');
    //         }
    //     },
    //     /**
    //      * 토큰 유효성 확인
    //      * @param {String} token 
    //      * @returns 
    //      */
    //     verifiyToken: (token) => {
    //         let result = false;

    //         jwt.verify(token, jwtPrivate.secret, function(err, decoded) {
    //             if (err) {
    //                 result = false;
    //             } else {
    //                 result = true;
    //             }
    //         });

    //         return result;
    //     },
    //     /**
    //      * 토큰 데이터 디코드
    //      * @param {String} token 
    //      * @returns {String} payload
    //      */
    //     decodeTokenPaylod: function(token) {
    //         let decodedToken = null;
    //         jwt.verify(token, jwtPrivate.secret, function(err, decoded) {
    //             if (err) {
    //                 throw err;
    //             }
                
    //             decodedToken = decoded;
    //         });

    //         return decodedToken;
    //     }
    // },
    dateUtils: {
        /**
         * 지정한 날짜 format에 맞춰 date를 변환하여 반환함
         * @param {String} format ex) YYYY-MM-DD HH:MI:SS
         * @param {Date} date 
         * @returns {String} format에 맞춰 변환된 날짜
         */
        getFormattedDateString: (format, date) => {
            if (format && typeof format != 'string') return null;
            if (date && typeof date.getDate != 'function') return null;

            var YYYY, MM, DD, HH, MI, SS = '';

            var result = '';
            
            format = format.toUpperCase(); // format 대문자로 변환

            switch (format) {
                case 'YYYY-MM-DD':
                case 'YYYY-MM-DD HH:MI:SS':
                    YYYY = String(date.getFullYear());
                    MM = String(date.getMonth() + 1);
                    MM = MM.length == 1 ? '0' + MM : MM;
                    DD = String(date.getDate());
                    DD = DD.length == 1 ? '0' + DD : DD;

                    result = `${YYYY}-${MM}-${DD}`;

                    if (format == 'YYYY-MM-DD HH:MI:SS') {
                        HH = String(date.getHours());
                        HH = HH.length == 1 ? '0' + HH : HH;
                        MI = String(date.getMinutes());
                        MI = MI.length == 1 ? '0' + MI : MI;
                        SS = String(date.getSeconds());
                        SS = SS.length == 1 ? '0' + SS : SS;
                        result = result + ` ${HH}:${MI}:${SS}`;
                    }
                    break;
                case 'YYYYMMDD':
                    YYYY = String(date.getFullYear());
                    MM = String(date.getMonth() + 1);
                    MM = MM.length == 1 ? '0' + MM : MM;
                    DD = String(date.getDate());
                    DD = DD.length == 1 ? '0' + DD : DD;
                        
                    result = `${YYYY}${MM}${DD}`;
                    break;
            }

            return result;
        },
        /**
         * 날짜 더하기 계산
         * @param {Date} date 
         * @param {Number} day
         * @returns 
         */
        addDays(date, days) {
            try {
                if (date.getDate == undefined) throw Error('Not Date type error');
                if (!Number.isInteger(days)) throw Error('Not Integer days Error');

                date = new Date(date.setDate(date.getDate() + days));
            } catch(error) {
                console.error(error);
                date = null;
            }
            
            return date;
        }
    },    
}