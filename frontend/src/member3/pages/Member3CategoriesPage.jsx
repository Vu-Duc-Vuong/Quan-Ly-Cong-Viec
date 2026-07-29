import { useEffect, useState } from 'react';
import {
  PencilSquare,
  PlusLg,
  Tags,
  Trash3,
  ChevronDown,
  ChevronRight
} from 'react-bootstrap-icons';

import {
  createMember3Category,
  deleteMember3Category,
  getMember3Categories,
  updateMember3Category
} from '../services/member3Service';

import '../styles/member3.css';


const emptyForm = {
  name: '',
  description: ''
};


export default function Member3CategoriesPage() {


  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [error, setError] = useState('');

  const [openCategory, setOpenCategory] = useState(null);



  const load = async () => {

    try {

      const response = await getMember3Categories();

      setCategories(response.data);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        'Không tải được danh mục'
      );

    }

  };



  useEffect(() => {

    load();

  }, []);




  const submit = async (event) => {

    event.preventDefault();


    if (!form.name.trim()) {

      setError(
        'Tên danh mục không được để trống'
      );

      return;

    }


    try {


      if (editingId) {

        await updateMember3Category(
          editingId,
          form
        );

      } else {

        await createMember3Category(
          form
        );

      }


      setForm(emptyForm);

      setEditingId(null);

      setError('');

      await load();


    } catch (err) {

      setError(
        err.response?.data?.message ||
        'Không lưu được danh mục'
      );

    }

  };




  const edit = (category) => {

    setEditingId(category.id);

    setForm({

      name: category.name,

      description:
        category.description || ''

    });

  };





  const remove = async (id) => {


    if (
      !window.confirm(
        'Bạn có chắc muốn xóa danh mục này?'
      )
    ) return;



    try {

      await deleteMember3Category(id);

      await load();


    } catch (err) {

      setError(
        err.response?.data?.message ||
        'Không xóa được danh mục'
      );

    }

  };





  const toggleCategory = (id) => {

    if (openCategory === id) {

      setOpenCategory(null);

    } else {

      setOpenCategory(id);

    }

  };





  return (

    <main className="member3-page">


      <header className="member3-page-header">

        <div>

          <span className="member3-eyebrow">

            <Tags />

            Phân loại công việc

          </span>


          <h1>
            Danh mục
          </h1>


          <p>
            Quản lý nhóm công việc và xem
            các công việc thuộc từng danh mục.
          </p>


        </div>


      </header>




      {
        error &&

        <div className="member3-alert">

          {error}

        </div>

      }





      <div className="member3-category-layout">



        <section className="member3-form-card">


          <div className="member3-section-heading">

            <div>

              <h3>

                {
                  editingId
                    ?
                    'Cập nhật danh mục'
                    :
                    'Thêm danh mục mới'
                }

              </h3>


              <p>
                Nhập tên và mô tả danh mục.
              </p>


            </div>

          </div>




          <form onSubmit={submit}>


            <label>

              Tên danh mục


              <input

                placeholder="Ví dụ: Học tập"

                value={form.name}

                onChange={(e)=>

                  setForm({

                    ...form,

                    name:e.target.value

                  })

                }

              />

            </label>





            <label>

              Mô tả


              <textarea

                rows="4"

                placeholder="Mô tả danh mục"

                value={form.description}

                onChange={(e)=>

                  setForm({

                    ...form,

                    description:e.target.value

                  })

                }

              />


            </label>





            <div className="member3-form-actions">


              <button

                className="member3-primary-button"

                type="submit"

              >

                <PlusLg />

                {
                  editingId
                  ?
                  ' Lưu thay đổi'
                  :
                  ' Thêm danh mục'
                }


              </button>





              {
                editingId &&

                <button

                  className="member3-secondary-button"

                  type="button"

                  onClick={()=>{

                    setEditingId(null);

                    setForm(emptyForm);

                  }}

                >

                  Hủy

                </button>

              }



            </div>



          </form>



        </section>







        <section className="member3-table-card">


          <div className="member3-section-heading">

            <div>

              <h3>
                Danh sách danh mục
              </h3>


              <p>

                Hiện có {categories.length}
                danh mục

              </p>


            </div>


          </div>






          <div className="member3-category-list">



            {
              categories.length === 0 &&

              <div className="member3-empty">

                Chưa có danh mục nào.

              </div>

            }






            {
              categories.map((category)=>(


                <article

                  className="member3-category-item"

                  key={category.id}

                >



<div

  className="member3-category-header"

  onClick={()=>toggleCategory(category.id)}

>


<div className="member3-category-avatar">

  <Tags />

</div>




<div className="member3-category-content">


<strong>

  {category.name}

</strong>


<p>

{
  category.description ||
  'Không có mô tả'
}

</p>


</div>



<div className="member3-category-toggle">

{
  openCategory === category.id

  ?

  <ChevronDown />

  :

  <ChevronRight />

}

</div>

                  </div>






                  <div className="member3-row-actions">


                    <button

                      title="Sửa"

                      onClick={()=>edit(category)}

                    >

                      <PencilSquare />

                    </button>



                    <button

                      className="danger"

                      title="Xóa"

                      onClick={()=>remove(category.id)}

                    >

                      <Trash3 />

                    </button>


                  </div>






                  {
                    openCategory === category.id &&


                    <div className="member3-category-tasks">


                      <strong>

                        Công việc:

                      </strong>



                      {
                        category.tasks &&
                        category.tasks.length > 0

                        ?

                        <ul>

                          {
                            category.tasks.map(task=>(

                              <li key={task.id}>

                                {task.title}

                              </li>

                            ))

                          }

                        </ul>


                        :

                        <p>

                          Chưa có công việc nào.

                        </p>

                      }



                    </div>


                  }




                </article>


              ))

            }



          </div>




        </section>




      </div>




    </main>

  );


}