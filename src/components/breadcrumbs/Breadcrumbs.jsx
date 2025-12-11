import { Breadcrumb } from "antd";
import styles from './breadcrumbs.module.css';
export const Breadcrumbs = ({items}) => {
  return (
    <Breadcrumb
        className={styles.breadcrumbs}
        items={items}
    />
  )
}