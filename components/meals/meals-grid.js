import MealItem from '@/components/meals/meal-item';
import classes from './meals-grid.module.css';

export default function MealsGrid({meals}) {
    return (
        <ul className={classes.meals}>
            {meals.map(meal => (
                <li key={meal.uid}>
                    <MealItem {...meal} />
                </li>
            ))}
        </ul>
    );
}
