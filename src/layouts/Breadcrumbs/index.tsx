import "./index.scss";
import { useStore } from "../../store/store";
import { useNavigate } from "react-router-dom";

export const Breadcrumbs = () => {
  const [{ breadcrumbs, user }] = useStore()

  const navigate = useNavigate()

  return (
    <div className='breadcrumbs' style={user ? { display: 'flex' } : { display: 'none' }}>
      {breadcrumbs.map(({ path, name }, i) => (
        <p key={`${i}-${name}`}
           onClick={() => navigate(path)}
        >
          {name}
        </p>
      ))}
    </div>
  )
}