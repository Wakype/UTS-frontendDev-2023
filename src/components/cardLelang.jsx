import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import CustomButton from './customButton';
import { NavLink } from 'react-router-dom';

const CardLelang = ({
  gambarBarang,
  tanggalLelang,
  namaBarang,
  namaUser,
  hargaAwal,
  hargaAkhir,
  id,
  status,
  id_lelang,
}) => {
  function replaceSpacesWithDash(text) {
    return text.trim().replace(/\s+/g, '-');
  }

  return (
    <div className="w-[350px] h-[530px] rounded bg-white border-t-[7px] border-b-[7px] border-[#00c29a] flex flex-col justify-between">
      <div className="h-[50%] rounded relative">
        <p className="text-white rounded bg-red-500 w-fit px-3 text-[14px] absolute left-3 top-3">
          {tanggalLelang}
        </p>
          <>{status}</>
        <img
          src="https://i.pinimg.com/736x/72/09/21/720921d9b99bdc03ea02e28d770fdfbc--coelho-the-box.jpg"
          alt=""
        />
      </div>

      <div className="h-[50%] p-[15px]">
        <h1 className="text-black font-semibold text-[18px] mb-3 line-clamp-2">
          {namaBarang}
        </h1>

        <div className="flex items-center space-x-2 mb-5">
          <div className="w-[35px] h-[35px] rounded-full bg-[#00c29a] flex items-center justify-center">
            <FaUserAlt color="white" />
          </div>
          <p className="text-black">{namaUser}</p>
        </div>

        <div className="flex flex-col mb-5">
          <div className="flex justify-between">
            <p className="text-white rounded bg-red-500 w-fit px-3 text-[12px]">
              Harga Awal
            </p>
            <p className="text-white rounded bg-red-500 w-fit px-3 text-[12px]">
              Harga akhir
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-black">{hargaAwal}</p>
            <p className="text-black font-bold text-[25px]">~</p>
            <p className="text-black">{hargaAkhir}</p>
          </div>
        </div>

        <NavLink
          to={`/penawaran/barang-lelang/${id_lelang}/${id}/${replaceSpacesWithDash(
            namaBarang
          )}`}
        >
          <CustomButton
            label={'Ajukan penawaran'}
            stylingP={'text-black hover:text-white'}
            stylingButton={
              'border-[#00c29a] w-full hover:bg-[#00c29a] cursor-pointer'
            }
          />
        </NavLink>
      </div>
    </div>
  );
};

export default CardLelang;
