export const logTpl = () => {
    const loggerList = JSON.parse(localStorage.getItem('logger'))

    return `
    <main class="w-full flex justify-center p-6">
        <table class="table-auto border-collapse w-full max-w-4xl">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border px-4 py-2 text-left">시간</th>
                    <th class="border px-4 py-2 text-left">이벤트 타입</th>
                    <th class="border px-4 py-2 text-left">발생 위치</th>
                    <th class="border px-4 py-2 text-left">내용</th>
                </tr>
            </thead>
            <tbody>
            ${loggerList.map((items) => {
        return `
                <tr class="bg-white border-b">
                    <td class="border px-4 py-2">${items.timestamp}</td>
                    <td class="border px-4 py-2">${items.type}</td>
                    <td class="border px-4 py-2">${items.location}</td>
                    <td class="border px-4 py-2">${items.message}</td>
                </tr>               
                `;
    }).join('')}
            </tbody>
        </table>
    </main>
    `;
}