import React from 'react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { CustomButton, CustomInput, SosmedLog } from '../components';
import { NavLink } from 'react-router-dom';

const Login = () => {
  return (
    <section className="bg-black h-screen">
      <header className="px-[30px] h-[10%]">
        <section className="justify-between flex items-center h-full">
          <div className=" logoT cursor-pointer text-[45px] bg-clip-text text-transparent bg-gradient-to-r from-[#00c29a] to-[#e8cd70]">
            Lelang<span className="text-[25px] logoT">Pro</span>
          </div>
          <div className="text-white">
            <NavLink to={'/register'}>
              <CustomButton
                label={'Registrasi sekarang!'}
                stylingButton={
                  'hover:bg-[#00c29a] hover:border-black border-[#00c29a] hover:-translate-y-1 '
                }
                stylingP={'text-[16px] hover:text-black'}
              />
            </NavLink>
          </div>
        </section>
      </header>

      <body className="h-[90%] pt-[100px]">
        <section className=" h-[90%] px-[30px]">
          <div className="flex flex-col items-center w-full mb-[50px]">
            <h1 className="text-[50px] logoT tracking-wide uppercase">
              Login sekarang{' '}
              <span className="text-[#00c29a] logoT">Tawar sekarang</span>
            </h1>
            <p className="text-[#88898e]">
              Menangkan bagian Anda, biarkan impian Anda menjadi kenyataan
            </p>
            <p className="text-[#88898e]">
              lelangpro telah digunakan lebih dari 1.000.000+ pengguna dan telah
              dipercaya oleh perusahaan - perusahaan besar
            </p>
          </div>

          <div className="w-full justify-center flex">
            <div className="flex justify-between items-center w-[1000px]">
              <div className="space-y-3 w-[400px]">
                <CustomInput
                  placeholder={'Alamat Email'}
                  inputStyle={'w-full'}
                />
                <CustomInput placeholder={'Password'} inputStyle={'w-full'} />
                <CustomButton
                  label={'Login'}
                  stylingP={'text-black'}
                  stylingButton={
                    'w-full py-4 border-none bg-gradient-to-r from-[#00c29a] to-[#e8cd70] hover:to-[#00c29a] hover:from-[#e8cd70]'
                  }
                />
                <div>
                  <p className="text-white underline italic cursor-pointer hover:text-[#88898e] transition-all ease-in-out w-fit">
                    Lupa Password?
                  </p>
                </div>
              </div>

              <div>
                <p className="text-white poppins font-bold text-[20px]">/</p>
              </div>

              <div className="w-[400px] space-y-3">
                <SosmedLog
                  label={'Masuk dengan Google'}
                  icon={<FaGoogle color="white" size={22} />}
                  stylingDiv={'border-[#00c29a] space-x-5 hover:bg-[#00c29a] justify-start'}
                />
                <SosmedLog
                  label={'Masuk dengan Facebook'}
                  icon={<FaFacebook color="white" size={22} />}
                  stylingDiv={'border-[#00c29a] space-x-5 hover:bg-[#00c29a] justify-start'}
                />
                <SosmedLog
                  label={'Masuk dengan Apple Account'}
                  icon={<FaApple color="white" size={22} />}
                  stylingDiv={'border-[#00c29a] space-x-5 hover:bg-[#00c29a] justify-start'}
                />
                <div className="flex justify-end">
                  <NavLink to={'/register'}>
                    <p className="text-white underline italic cursor-pointer text-end hover:text-[#88898e] transition-all ease-in-out w-fit">
                      Buat akun
                    </p>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className=" h-[10%] px-[30px]">
          <div className="flex justify-between items-center h-full">
            <p className="text-[#88898e] italic text-[13px]">
              PTS 2023 - SMK MADIINATUL QUR'AN
            </p>
            <p className="text-[#88898e] italic text-[13px]">
              Copyright® Waky 2023
            </p>
          </div>
        </section>
      </body>
    </section>
  );
};

export default Login;