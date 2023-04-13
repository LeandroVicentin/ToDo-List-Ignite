import { PlusCircle, Notepad, Trash } from 'phosphor-react';
import styles from './NewTask.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Task {
    id?: number | string;
    checked?: boolean;
    text?: string;
}

export function NewTask() {
    const [tasks, setTasks] = useState([{}]);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [newTaskText, setNewTaskText] = useState('');
    const [isEmpty, setIsEmpty] = useState(true);

    const isNewTaskEmpty = newTaskText.length === 0;

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault()
        let newTask = {
            id: tasks.length + 1,
            checked: false,
            text: newTaskText
        }

        setTasks([...tasks, newTask]);
        setNewTaskText('');
        setIsEmpty(false)
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewTaskText(event.target.value)
    }

    function handleShipping(e:any, index:number, id:any) {

        let count = tasks.map((data : Task) => {
            if (data.id == id) {
                data.checked = e.target.checked;
            }
            return data
        })

        setTasks([...count]);


        let completed = 0;
        count.forEach((e) => {
            if (e.checked === true) {
                completed += 1;
            }
        })

        setCompletedTasks(completed);
    }

    function deleteTask(index: number) {
        const tasksWithoutDeletedOne = tasks.filter((tsk, i) => {
            return i !== index
        });

        setTasks(tasksWithoutDeletedOne);
        let completed = 0;
        let checkTaskExists = 0;
        tasksWithoutDeletedOne.forEach((e: Task) => {
            if (e.checked === true) {
                completed += 1;
                checkTaskExists += 1;
            } else if (e.checked === false) {
                checkTaskExists += 1;
            }
        })

        if (checkTaskExists > 0) {
            setIsEmpty(false)
        } else {
            setIsEmpty(true)
        }

        setCompletedTasks(completed);
    }

    return (
        <article>
            <form className={styles.taskForm} onSubmit={handleCreateNewTask}>
                <textarea
                    name='comment'
                    placeholder='Adicione um comentário'
                    value={newTaskText}
                    onChange={handleNewTaskChange}
                />

                <footer>
                    <button className={styles.button} type='submit' disabled={isNewTaskEmpty}>Criar<PlusCircle size={22} className={styles.plusCircle} /></button>
                </footer>
            </form>
            <div>
                <div className={styles.totalTasks}>
                    <p className={styles.first}>
                        <div>
                            <span><b>Tarefas criadas</b></span>
                            <span className={styles.total}>{tasks.length - 1}</span>
                        </div>
                    </p>
                    <p className={styles.second}>
                        <div>
                            <span><b>Concluídas</b></span>
                            <span className={styles.total}>{completedTasks}</span>
                        </div>
                    </p>
                </div>
                <article className={styles.containerList}>
                    <div className={styles.taskList}>

                        <div>{tasks.map((item: Task, index: any) => {
                            if (item.checked == false || item.checked == true) {
                                return (
                                    <div className={styles.itemList}>
                                        <input type="checkbox" checked={item.checked} onChange={(e) => handleShipping(e, index, item.id)} />
                                        <div className={item.checked ? styles.completedItem : styles.item}>
                                            {item.text}
                                        </div>
                                        <button onClick={(ev) => deleteTask(index)} title="Deletar comentário">
                                            <Trash size={24} />
                                        </button>
                                    </div>
                                )
                            }
                        })}
                        </div>

                        {isEmpty == true && (
                            <div className={styles.noTasks}>
                                <div>
                                    <Notepad size={72} />
                                </div>
                                <div>
                                    <b>Você ainda não tem tarefas cadastradas</b>
                                </div>
                                <div>
                                    Crie tarefas e organize seus itens a fazer
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </article>
    )
}