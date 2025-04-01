import InputSmaller from "../inputs/smaller/InputSmaller";
import InputSubmit from '../inputs/submit/InputSubmit';
import styles from './Category.module.css';

function Category() {
    return (
        <>
            <div>
                <div className={`${styles.info}`}>
                    <InputSmaller type="text" placeholder="Category name" />
                    <InputSmaller type="number" placeholder="Tax (%)" />
                </div>
                <InputSubmit type="submit" value="Add category" />
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

export default Category;