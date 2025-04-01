import InputSmaller from "../inputs/smaller/InputSmaller";
import InputBigger from '../inputs/bigger/InputBigger';
import InputSubmit from "../inputs/submit/InputSubmit";
import styles from './Product.module.css';

function Product() {
    return (
        <>
            <div>
                <InputBigger type="text" placeholder="Product name" />
                <div className={`${styles.info}`}>
                    <InputSmaller type="number" placeholder="Amount" />
                    <InputSmaller type="number" placeholder="Unit price ($)" />
                    <select>
                        <option value="" selected hidden>Select category</option>
                    </select>
                </div>
                <InputSubmit type="submit" value="Add product" />
            </div>
            <div className={`${styles.table}`}>
                {/* <tr>
                    <th>Code</th>
                    <th>Category</th>
                    <th>Tax</th>
                </tr>
                <tr>
                    <td>001</td>
                    <td>Food</td>
                    <td>10%</td>
                    <td><button class="btn-table" id="remove-category">Delete</button></td>
                </tr> */}
            </div>
        </>
    )
}

export default Product