export class CommonUtil {

    public static setMaxLengthContent(content: string, maxLength: number) {
        if (!content) return ""
        if (maxLength < 0) return ""
        return content.length >= maxLength ? content.substring(0, maxLength) + "..." : content
    }

    public static formatNumber(giaTri: number) {
        if (!giaTri || Number.isNaN(giaTri)) {
            giaTri = 0;
        }
        let value = "";
        let isNegativeNumber = false;

        const roundedValue = Math.floor(giaTri);
        const divValue = giaTri - roundedValue;

        value = roundedValue.toString();

        if (Number(value) < 0) {
            value = value.substring(1);
            isNegativeNumber = true;
        }

        let div = Math.floor(value.length / 3);
        let surplus = value.length % 3;
        let result = "";
        let index = 0;

        if (surplus == 0) {
            surplus = 3;
        } else {
            div = div + 1;
        }

        if (div == 0) {
            div = 1;
        }

        while (div > 0) {
            if (div == 1) {
                result += value.substring(index, surplus);
            } else {
                result += value.substring(index, surplus) + ",";
                index = surplus;
                surplus += 3;
            }
            div = div - 1;
        }

        if (isNegativeNumber) {
            result = "-" + result;
        }

        let temp = divValue.toFixed(2).substring(1)

        return result + (divValue > 0 ? temp : "");
    }

    public static formatDate = (value: any) => {
        if (value == undefined || value == "") return "";
        let date = new Date(value);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }

}