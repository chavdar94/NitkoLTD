import { useNavigate } from 'react-router-dom';
import styles from './WorkerCard.module.css';

const WorkerCard = ({ id, first_name, last_name, jobs, worker_fields }) => {
    const navigate = useNavigate();

    const lastJob =
        jobs.length > 0 ? jobs[jobs.length - 1].job_type : 'Няма задачи';
    const lastField =
        worker_fields.length > 0
            ? worker_fields[worker_fields.length - 1].field__name
            : 'Няма ниви';

    const handleClick = () => {
        navigate(`${id}`);
    };

    return (
        <div onClick={handleClick} className={styles['card']}>
            <h4 className={styles['worker-name']}>
                {first_name} {last_name}
            </h4>
            <div className={styles['list']}>
                <p className={styles['sub-heading']}>Последна задача:</p>
                <p className={styles['last-job']}>{lastJob}</p>
            </div>
            <div className={styles['list']}>
                <p className={styles['sub-heading']}>Последна нива:</p>
                <p className={styles['last-job']}>{lastField}</p>
            </div>
        </div>
    );
};

export default WorkerCard;
