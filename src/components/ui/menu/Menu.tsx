import "./menu.css";
import { Button } from "../form/Button";

export interface MenuItem {
  label: string;
  onClick: () => void;
}

interface MenuProps {
  items: MenuItem[];
}

export function Menu({ items }: MenuProps) {
  return (
    <ul className="menu">
      {items.map((item) => (
        <li key={item.label} className="menu-item">
          <Button onClick={item.onClick}>{item.label}</Button>
        </li>
      ))}
    </ul>
  );
}
