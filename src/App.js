import { useEffect, useState } from 'react';
import './App.css';
import { Table } from 'antd';

function App() {

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setLoading(true)
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then(response=>response.json())
    .then(data=>{
      setDataSource(data)
    }).catch(err=>{
      console.log(err);
    }).finally(()=>{
      setLoading(false)
    })
  }, []);

  const columns = [
    {
      key:"1",
      title:'ID',
      dataIndex:'id',
      sorter:(idSort1,idSort2)=>{
        return idSort1.id > idSort2.id
      }
    },
    {
      key:"2",
      title:'User ID',
      dataIndex:'userId',
      sorter:(userIdSort1, userIdSort2)=>{
        return userIdSort1.userId > userIdSort2.userId
      }
    },
    {
      key:"3",
      title:'Status',
      dataIndex:'completed',
      render:(completed)=>{
        return <p>{completed?'Complete':'In Progress'}</p>
      },
      filters:[
        {text:'Complete',value:true},
        {text:'In Progress',value:false}
      ],
      onFilter:(value, record)=>{
        return record.completed === value
      }
    },
    {
      key:"4",
      title:"Title",
      dataIndex:'title'
    }
  ]
  return (
    <>
      <div className="App">
        <div className="App-header">
          <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={
            {
            current: page,
            pageSize:pageSize,
            onChange:(page,pageSize)=>{
              setPage(page)
              setPageSize(pageSize)
            }
            }
          }>
          </Table>
        </div>
      </div>
    </>
  );
}

export default App;
