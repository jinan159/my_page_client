module.exports = {
    dateUtils: {
        /**
         * 지정한 날짜 format에 맞춰 date를 변환하여 반환함
         * @param {String} format ex) YYYY-MM-DD HH:MI:SS
         * @param {Date} date 
         * @returns {String} format에 맞춰 변환된 날짜
         */
        dateFormatString: (format, date) => {
            if (format && typeof format != 'string') return null;
            if (date && typeof date.getDate != 'function') return null;

            var result = '';
            var YYYY, MM, DD, HH, MI, SS = '';
            
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
                        result = result + `${HH}:${MI}:${SS}`;
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
        }
    }
}