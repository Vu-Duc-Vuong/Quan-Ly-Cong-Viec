import { useEffect, useState } from 'react';

import {
  BarChart,
  CalendarEvent,
  Tag
} from 'react-bootstrap-icons';

import Member3StatisticsCards from '../components/Member3StatisticsCards';
import Member3TaskFilter from '../components/Member3TaskFilter';

import {
  getMember3Categories,
  getMember3Statistics,
  queryMember3Tasks
} from '../services/member3Service';

import '../styles/member3.css';


const statusText = {
  TODO: 'Chưa làm',
  DOING: 'Đang làm',
  DONE: 'Hoàn thành'
};


export default function Member3StatisticsPage() {


  const [statistics, setStatistics] = useState({

    totalTasks: 0,

    dueTodayTasks: 0,

    overdueTasks: 0,

    completedTasks: 0

  });


  const [categories, setCategories] = useState([]);


  const [tasks, setTasks] = useState([]);


  const [filters, setFilters] = useState({

    keyword: '',

    categoryId: '',

    status: ''

  });


  const [error, setError] = useState('');


  const [loading, setLoading] = useState(true);



  // Lấy dữ liệu thống kê + danh mục để lọc
  useEffect(() => {


    Promise.all([

      getMember3Statistics(),

      getMember3Categories()

    ])

      .then(([statsResponse, categoriesResponse]) => {


        setStatistics(statsResponse.data);


        setCategories(categoriesResponse.data);


      })


      .catch((err) => {


        setError(

          err.response?.data?.message ||

          'Không tải được dữ liệu thống kê'

        );


      });


  }, []);




  // Lấy danh sách công việc theo bộ lọc
  useEffect(() => {


    setLoading(true);


    const timer = setTimeout(() => {


      queryMember3Tasks(filters)


        .then((response) => {


          setTasks(response.data);


        })


        .catch((err) => {


          setError(

            err.response?.data?.message ||

            'Không lọc được công việc'

          );


        })


        .finally(() => {


          setLoading(false);


        });


    }, 250);



    return () => clearTimeout(timer);



  }, [filters]);





  return (

    <main className="member3-page">


      <header className="member3-page-header">

        <div>


          <span className="member3-eyebrow">

            <BarChart />

            Báo cáo công việc

          </span>



          <h1>

            Thống kê

          </h1>



          <p>

            Theo dõi tiến độ, deadline và tra cứu công việc của bạn.

          </p>


        </div>


      </header>





      {

        error && (

          <div className="member3-alert">

            {error}

          </div>

        )

      }






      <Member3StatisticsCards

        statistics={statistics}

      />





      <Member3TaskFilter

        filters={filters}

        categories={categories}

        onChange={setFilters}

      />







      <section className="member3-table-card">



        <div className="member3-section-heading">


          <div>


            <h3>

              Danh sách công việc

            </h3>



            <p>

              {

                loading

                  ?

                  'Đang tải dữ liệu...'

                  :

                  `Tìm thấy ${tasks.length} công việc`

              }

            </p>


          </div>


        </div>







        <div className="member3-table-wrap">


          <table className="member3-table">


            <thead>

              <tr>

                <th>

                  Công việc

                </th>


                <th>

                  Trạng thái

                </th>


                <th>

                  Deadline

                </th>


                <th>

                  Danh mục

                </th>


              </tr>


            </thead>






            <tbody>



              {

                !loading && tasks.length === 0 && (


                  <tr>


                    <td

                      colSpan="4"

                      className="member3-empty"

                    >

                      Không có công việc phù hợp.

                    </td>


                  </tr>


                )

              }








              {

                tasks.map((task) => (


                  <tr key={task.id}>


                    <td>


                      <strong>

                        {task.title}

                      </strong>



                      <span>

                        {

                          task.description ||

                          'Không có mô tả'

                        }

                      </span>


                    </td>





                    <td>


                      <span

                        className={

                          `member3-status status-${task.status.toLowerCase()}`

                        }

                      >

                        {

                          statusText[task.status] ||

                          task.status

                        }


                      </span>


                    </td>







                    <td>


                      <span className="member3-inline">


                        <CalendarEvent />


                        {


                          task.deadline

                            ?

                            new Date(task.deadline)

                              .toLocaleString('vi-VN')

                            :

                            'Chưa đặt'

                        }



                      </span>


                    </td>








                    <td>


                      <span className="member3-inline">


                        <Tag />



                        {


                          task.category?.name ||

                          'Chưa phân loại'

                        }



                      </span>


                    </td>





                  </tr>


                ))


              }





            </tbody>



          </table>



        </div>



      </section>



    </main>

  );


}