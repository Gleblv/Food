const postData = async (url, data) => { // оператор async говорит что внутри функции у нас будет какой-то асинхронный код
    const res = await fetch(url, { // await ставиться перед операциями которых необходимо дождаться
        method: "POST", //метод
        headers: { //заголовки
            "Content-type": "application/json"
        },
        body: data // что мы передаём
    });

    return await res.json();
};

// Функция чтобы получить данные из DataBase
const getResource = async (url) => { // оператор async говорит что внутри функции у нас будет какой-то асинхронный код
    const res = await fetch(url); // await ставиться перед операциями которых необходимо дождаться

    if (!res.ok) { // Если наш запрос не выполняется, то выводим ошибку
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
};

export {postData};
export {getResource};