import { useEffect, useState } from 'react';
import { validInputs, validName, clearInputs } from '../helpers/inputs';
import useCategory from '../hooks/useCategory';
import useProduct from '../hooks/useProduct';

import Input from '../components/input/Input';
import Button from '../components/button/Button';
import ButtonAction from '../components/button/buttonAction/ButtonAction';
import styles from './Category.module.css';

const Category = () => {
    const { categories, getCategories, validTax } = useCategory();
    const { products, getProducts } = useProduct();

    const [categoryName, setCategoryName] = useState("");
    const [tax, setTax] = useState("");

    useEffect(() => {
        getCategories();
        getProducts();
    }, [])

    const createCategory = async () => {
        if (!validInputs(categoryName, tax)) {
            return alert("All fields need to be filled!")
        };

        if (!validName(categoryName)) {
            return alert("The field category name aceppts only letters")
        };

        if (!validTax(tax)) {
            return alert("The number you want to put isn't valid!");
        };

        const newCategory = {
            code: categories.length > 0 ? categories[categories.length - 1].code + 1 : 1,
            name: categoryName,
            tax: tax,
        }

        try {
            const response = await fetch('http://localhost/categories', {
                method: "POST",
                body: JSON.stringify(newCategory),
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            await getCategories();
            clearInputs(setTax, setCategoryName);

        } catch (e) {
            console.error("Erro ao adicionar categoria:", e);
        }

    }

    const deleteCategory = async (id) => {
        let existingItem = products.find((product) => product.category_code === id);

        if (existingItem) {
            return alert("Can't delete the category because there's a product using it!");
        } else {
            const response = await fetch(`http://localhost/categories/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
        }

        await getCategories();
    }

    return (
        <>
            <div>
                <div className={`${styles.inputs}`}>
                    <Input type="text" placeholder="Category name" onChange={(e) => setCategoryName(e.target.value)} value={categoryName} />
                    <Input type="number" placeholder="Tax (%)" onChange={(e) => setTax(e.target.value)} value={tax} />
                    <Button onClick={createCategory}>Add category</Button>
                </div>
            </div>
            <div>
                <table className={`${styles.table}`}>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Category</th>
                            <th>Tax</th>
                            <th className={`${styles.lastElement}`}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.code}>
                                <td className={`${styles.td}`}>{category.code}</td>
                                <td className={`${styles.td}`} >{category.name}</td>
                                <td className={`${styles.td}`}>{Number(category.tax)}%</td>
                                <td className={`${styles.lastElement}`}><ButtonAction onClick={() => deleteCategory(category.code)}>Delete</ButtonAction></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Category;