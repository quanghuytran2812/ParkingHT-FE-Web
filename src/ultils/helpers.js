export const validate = (payload, setInvalidFields) => {
    let invalids = 0
    const formatPayload = Object.entries(payload)
    for (let arr of formatPayload) {
        if (arr[1].trim() === '') {
            console.log(arr[0])
            invalids++
            setInvalidFields(prev => [...prev, { name: arr[0], mes: 'Không được để trống!' }])
        }
    }
    for (let arr of formatPayload) {
        switch (arr[0]) {
            case 'phoneNumber':
                const regex = /(03|05|07|08|09)+([0-9]{8})\b/
                if (!regex.test(arr[1])) {
                    invalids++
                    setInvalidFields(prev => [...prev, { name: arr[0], mes: 'Số điện thoại không hợp lệ!' }])
                }
                break;
            case 'password':
                const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/
                if (!arr[1].match(regexPass)) {
                    invalids++
                    setInvalidFields(prev => [...prev, {
                        name: arr[0], mes: '- Mật khẩu phải có ít nhất 8 ký tự.\n' +
                            '- Chứa ít nhất một chữ thường.\n' +
                            '- Một chữ cái viết hoa.\n' +
                            '- Một chữ số.\n' +
                            '- Một nhân vật đặc biệt.'
                    }])
                }
                break;
            default:
                break;
        }
    }

    return invalids;
}