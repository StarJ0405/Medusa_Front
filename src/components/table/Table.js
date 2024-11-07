import style from "./Table.module.css";

function Table(props) {
    const { data } = props;

    return (
        <div>
            {
                data && data.length > 0 ?
                    <table>
                        <thead>
                            <tr>
                                {
                                    Object.keys(data[0]).map((key, index) =>
                                        <th key={index}>
                                            {key}
                                        </th>
                                    )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row, index) =>
                                    <tr key={index}>
                                        {
                                            Object.keys(row).map((key, index) =>
                                                <td key={index}>
                                                    {row[key]}
                                                </td>
                                            )
                                        }
                                    </tr>)
                            }
                        </tbody>
                    </table>
                    : <p>loading</p>
            }
        </div>

    );
}

export default Table;