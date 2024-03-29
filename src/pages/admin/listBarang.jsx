import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { CustomButton, CustomInput, SearchButton } from '../../components';
import { deleteBarang, getBarang, getDetailBarang } from '../../api/barangApi';
import * as Yup from 'yup';
import * as dayjs from 'dayjs';
import rupiahFormat from 'rupiah-format';
import { useQuery, useQueryClient } from 'react-query';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { actionUpdateBarang } from '../../redux/action/barangAction';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

const ListBarang = () => {
  const dispatch = useDispatch();
  const redux = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [checkPage, setCheckPage] = useState('');
  const [barang, setBarang] = useState([]);
  const convertRupiah = require('rupiah-format');
  let navigate = useNavigate();
  let location = useLocation();
  const [path1, path2, path3] = location.pathname.split('/').slice(1);

  const handleGetBarang = async () => {
    try {
      setIsLoading(true);
      let response = await getBarang(
        formikFilter.values.keyword,
        formikFilter.values.hargaMinimal,
        formikFilter.values.hargaMaximum,
        formikFilter.values.isMine,
        formikFilter.values.page,
        formikFilter.values.pageSize
      );
      console.log('barang', response);
      setBarang(response?.data?.data?.rows);
      setCheckPage(response?.data?.pagination?.totalData);
      return response;
    } catch (err) {
      console.log('barangerr', err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleGetDetailBarang = async (id) => {
    try {
      setIsLoading(true);
      let response = await getDetailBarang(id);

      const dataBarang = response?.data?.data;
      formik.setValues({
        id: dataBarang.id,
        namaBarang: dataBarang.namaBarang,
        deskripsiBarang: dataBarang.deskripsiBarang,
        hargaAwal: dataBarang.hargaAwal,
      });
      console.log('responnya', response);
    } catch (err) {
      console.log('barangerr', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBarang = async (id) => {
    try {
      setIsLoading(true);
      let response = await deleteBarang(id);
      toast.success(response?.data?.msg, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      handleGetBarang();
      console.log('responnya', response);
    } catch (err) {
      console.log('barangerr', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formikFilter = useFormik({
    initialValues: {
      isMine: '',
      hargaMaximum: '',
      hargaMinimal: '',
      keyword: '',
      page: 1,
      pageSize: 7,
    },
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      namaBarang: '',
      deskripsiBarang: '',
      hargaAwal: '',
    },
    validationSchema: Yup.object().shape({
      namaBarang: Yup.string()
        .min(10, 'Nama Barang minimal 10 huruf')
        .required('Nama Barang wajib diisi'),
      deskripsiBarang: Yup.string()
        .min(20, 'Deskripsi Barang minimal 20 huruf')
        .required('Deskripsi Barang wajib diisi'),
      hargaAwal: Yup.number()
        .moreThan(1000, 'Harga harus lebih dari Rp1.000,-')
        .required('Harga Awal wajib diisi'),
    }),
    onSubmit: (values) => {
      const handleSubmit = async (e) => {
        try {
          const response = await dispatch(actionUpdateBarang(values));
          console.log('responnya', response);
          if (response?.data?.status === 'Success') {
            toast.success(response?.data?.msg, {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            });
            setShowModal(false);
            return handleGetBarang();
          }
          if (response?.response?.data?.status === 'Fail') {
            toast.error(response?.response?.data?.msg, {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            });
          }
        } catch (err) {
          console.log('authregisterErr =>', err);
        } finally {
        }
      };
      handleSubmit();
    },
  });
  useEffect(() => {
    handleGetBarang();
  }, [formikFilter.values.page]);
  return (
    <section className="w-full h-screen bg-[#092742] py-[50px] px-[50px]">
      <div className="mb-[70px]">
        <h1 className="text-[25px] font-semibold">Pendataan Barang</h1>
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center mb-5">
          <div>
            <p>
              {path1} &gt; {path2} &gt;{' '}
              <span className="text-[#00c29f]">{path3}</span>
            </p>
          </div>
          <div className="flex space-x-5">
            <div className="flex">
              <SearchButton />
            </div>
            <NavLink to={`/${path1}/${path2}/${path3}/tambah-barang`}>
              <CustomButton
                label={'Tambah barang'}
                stylingButton={'border-[#00c29f] hover:bg-[#00c29f]'}
              />
            </NavLink>
          </div>
        </div>
        <table class="table-auto w-full border border-[#00c29a] rounded">
          <tr className="border border-[#00c29a] h-[50px] rounded bg-[#00c29a]">
            <th className="w-[50px]">#</th>
            <th className="text-left">Gambar</th>
            <th className="text-left">Nama Barang</th>
            <th className="text-left">Tanggal Lelang</th>
            <th className="text-left">Harga Awal</th>
            <th className="text-left">Deskripsi Barang</th>
            <th className="text-left">Aksi</th>
          </tr>

          {isLoading ? (
            <td
              colSpan={7}
              rowSpan={7}
              className="w-full py-10 pl-10 flex justify-center"
            >
              <div>
                <ScaleLoader color="#00c29a" height={30} width={800} />
              </div>
            </td>
          ) : (
            <>
              {barang?.map((item, index) => {
                return (
                  <>
                    {showModal ? (
                      <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                          <div className="relative w-[30%] my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                              <div className="flex items-start justify-between p-5 ">
                                <h1 className="text-2xl font-semibold bg-[#00c29a] rounded py-2 px-5 text-black">
                                  Edit Barang
                                </h1>
                                <button
                                  className="p-1 ml-auto bg-transparent border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                  onClick={() => setShowModal(false)}
                                >
                                  <p className=" text-white h-6 w-6 text-2xl block outline-none focus:outline-none hover:text-red-500 transition-all ease-in-out">
                                    &times;
                                  </p>
                                </button>
                              </div>

                              <div className="relative p-6 flex-auto">
                                <form
                                  action=""
                                  className="space-y-10 w-full"
                                  onSubmit={formik.handleSubmit}
                                >
                                  <CustomInput
                                    placeholder={'Nama Barang'}
                                    inputStyle={
                                      'w-full border-[#00c29a] border bg-black'
                                    }
                                    inputType={'text'}
                                    id={'namaBarang'}
                                    name={'namaBarang'}
                                    value={formik.values.namaBarang}
                                    onChange={formik.handleChange}
                                    isError={
                                      formik.touched.namaBarang &&
                                      formik.errors.namaBarang
                                    }
                                    textError={formik.errors.namaBarang}
                                    onBlur={formik.handleBlur}
                                  />
                                  <CustomInput
                                    placeholder={'Deskripsi Barang'}
                                    inputStyle={
                                      'w-full border-[#00c29a] border bg-black'
                                    }
                                    inputType={'text'}
                                    id={'deskripsiBarang'}
                                    name={'deskripsiBarang'}
                                    value={formik.values.deskripsiBarang}
                                    onChange={formik.handleChange}
                                    isError={
                                      formik.touched.deskripsiBarang &&
                                      formik.errors.deskripsiBarang
                                    }
                                    textError={formik.errors.deskripsiBarang}
                                    onBlur={formik.handleBlur}
                                  />
                                  <div className="w-full flex space-x-3">
                                    <div className="border border-[#00c29a] px-5 rounded bg-black flex items-center">
                                      <p className="font-bold">Rp</p>
                                    </div>
                                    <CustomInput
                                      placeholder={'Harga Awal'}
                                      inputStyle={
                                        'w-full border-[#00c29a] border bg-black'
                                      }
                                      inputType={'number'}
                                      id={'hargaAwal'}
                                      name={'hargaAwal'}
                                      value={formik.values.hargaAwal}
                                      onChange={formik.handleChange}
                                      isError={
                                        formik.touched.hargaAwal &&
                                        formik.errors.hargaAwal
                                      }
                                      textError={formik.errors.hargaAwal}
                                      onBlur={formik.handleBlur}
                                    />
                                  </div>
                                  <div className="flex space-x-10">
                                    <CustomButton
                                      onClick={() => setShowModal(false)}
                                      type={'button'}
                                      label={'Batal'}
                                      stylingP={'hover:text-black'}
                                      stylingButton={
                                        'border border-red-500 py-3 hover:bg-red-500 w-full'
                                      }
                                    />
                                    <CustomButton
                                      type={'submit'}
                                      label={'Update Barang'}
                                      stylingP={'hover:text-black'}
                                      stylingButton={
                                        'border border-[#00c29a]  py-3 bg-[#00c29a] w-full'
                                      }
                                    />
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                      </>
                    ) : null}
                    <tr key={index} className="mb-5">
                      <td className="text-center">{item.id}</td>
                      <td className="w-[100px]">
                        <img
                          src="https://www.thewindowsclub.com/wp-content/uploads/2018/06/Broken-image-icon-in-Chrome.gif"
                          alt=""
                          width={20}
                          className="ml-5"
                        />
                      </td>
                      <td>
                        <p className="line-clamp-2 w-[250px]">
                          {item.namaBarang}
                        </p>
                      </td>
                      <td>{dayjs(item.tanggal).format('DD MMM YYYY')}</td>
                      <td>{convertRupiah.convert(item.hargaAwal)}</td>
                      <td className="">
                        <p className="w-[300px] line-clamp-2">
                          {item.deskripsiBarang}
                        </p>
                      </td>
                      <td className="mb-5 ">
                        {item?.id_petugas === redux?.id ? (
                          <div className="flex pr-5 py-5 w-full justify-center space-x-3">
                            <CustomButton
                              onClick={() => handleDeleteBarang(item?.id)}
                              label={'hapus'}
                              stylingButton={
                                'w-full border-red-500 hover:bg-red-500'
                              }
                            />
                            <CustomButton
                              onClick={() => {
                                handleGetDetailBarang(item?.id);

                                return setShowModal(true);
                              }}
                              label={'Edit'}
                              stylingButton={
                                'w-full border-yellow-500 hover:bg-yellow-500'
                              }
                            />
                          </div>
                        ) : (
                          <div className="pr-5 py-5 w-full">
                            <CustomButton
                              onClick={() => {
                                toast.error(
                                  'Anda tidak bisa mengedit / menghapus karena ini bukan milik anda',
                                  {
                                    position: 'top-right',
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: 'colored',
                                  }
                                );
                              }}
                              type={'button'}
                              label={'Tidak bisa diedit / dihapus'}
                              stylingButton={
                                'w-full border-red-500 hover:bg-red-500 cursor-not-allowed'
                              }
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                  </>
                );
              })}
            </>
          )}
        </table>
      </div>

      <div className="w-full mt-[20px]">
        <div className="flex space-x-3 items-center">
          <>
            {formikFilter.values.page > 1 ? (
              <div
                className="cursor-pointer"
                onClick={() =>
                  formikFilter.setValues({
                    page: formikFilter.values.page - 1,
                  })
                }
              >
                <BiLeftArrow color="#00c29a" size={22} />
              </div>
            ) : (
              <div className="cursor-not-allowed">
                <BiLeftArrow color="grey" size={22} />
              </div>
            )}
          </>
          <div className="text-white font-bold text-[18px]">
            {checkPage > 7 ? (
              <input
                type="number"
                value={formikFilter.values.page}
                onChange={formikFilter.handleChange}
                name="page"
                id="page"
                className="w-[50px] bg-black text-center border-[#00c29a] rounded"
              />
            ) : (
              <div
                onClick={() =>
                  toast.info(`Total data hanya ada ${checkPage}`, {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                  })
                }
              >
                <input
                  type="number"
                  disabled
                  value={formikFilter.values.page}
                  onChange={formikFilter.handleChange}
                  name="page"
                  id="page"
                  className="w-[50px] cursor-not-allowed bg-black text-center border-[#00c29a] rounded"
                />
              </div>
            )}
          </div>
          <div
            className="cursor-pointer"
            onClick={() =>
              formikFilter.setValues({ page: formikFilter.values.page + 1 })
            }
          >
            <BiRightArrow color="#00c29a" size={22} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListBarang;
