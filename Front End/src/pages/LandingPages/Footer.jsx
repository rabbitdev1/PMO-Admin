import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { ReactComponent as InstagramIcon } from "../../assets/socialmedia/Instagram.svg";
import { ReactComponent as TiktokIcon } from "../../assets/socialmedia/TikTok.svg";
import { ReactComponent as FacebookIcon } from "../../assets/socialmedia/facebook.svg";
import { ReactComponent as PlaystoreIcon } from "../../assets/socialmedia/playstore_light.svg";
import { ReactComponent as WAIcon } from "../../assets/socialmedia/whatapps.svg";
import { ReactComponent as XIcon } from "../../assets/socialmedia/x.svg";
import LoadingLink from '../../components/common/LoadingLink';

const Footer = () => {
  return (
    <footer className="flex flex-col gap-3 bg-[#242424] text-darkColor">
      <div className="lg:container lg:mx-auto xl:max-w-screen-xl w-full flex flex-col gap-3">
        <div className="flex flex-col basis-6/12 gap-4 p-3">
          <LoadingLink to="/" className="flex flex-row">
            <LazyLoadImage
              className="h-16 w-40 flex object-contain"
              alt="logo"
              src={require("../../assets/image/logo/light.png")}
              effect="blur"
            />
          </LoadingLink>
          <p className="text-sm">
            BAKOMINFO Kota Bandung merupakan Lembaga Teknis Daerah dibentuk berdasarkan Peraturan Daerah Kota Bandung Nomor 12 Tahun 2007, Tanggal 4 Desember 2007 serta merupakan penggabungan Satuan Kerja Pemerintah Daerah (SKPD) Dinas dan Kantor di lingkungan Pemerintah Kota Bandung yaitu Dinas Informasi dan Komunikasi dengan Kantor Pengolahan Data Elektronik (KPDE). Dengan demikian BAKOMINFO terbentuk sejak diberlakukannya PERDA Nomor 12 Tahun 2007 tentang Pembentukan dan Susunan Organisasi Dinas Daerah Kota Bandung.
          </p>
          <div className="flex flex-col gap-2 col-span-2">
            <div className="flex gap-3 overflow-x-scroll no-scrollbar">
              <button className="" onClick={() => ""}>
                <WAIcon className="h-7 w-7" fill={'#ffffff'} />
              </button>
              <button className="" onClick={() => ""}>
                <FacebookIcon className="h-7 w-7" fill={'#ffffff'} />
              </button>
              <button className="" onClick={() => ""}>
                <InstagramIcon className="h-7 w-7" fill={'#ffffff'} />
              </button>
              <button className="" onClick={() => ""}>
                <TiktokIcon className="h-7 w-7" fill={'#ffffff'} />
              </button>
              <button className="" onClick={() => ""}>
                <XIcon className="h-7 w-7" fill={'#ffffff'} />
              </button>
              <button className="col-span-2" onClick={() => ""}>
                <PlaystoreIcon className="h-6 w-auto" fill={'#ffffff'} />
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1 no-underline px-3 py-3 text-darkColor">
          <div className="flex flex-1 flex-col">
            <span className="font-semibold text-lg mb-2">Peta Situs</span>
            <LoadingLink to="/about" className="no-underline">
              <span className="text-sm text-darkColor">Tentang</span>
            </LoadingLink>
            <LoadingLink to="/faq" className="no-underline">
              <span className="text-sm text-darkColor">FAQ</span>
            </LoadingLink>
            <LoadingLink to="/term-and-conditional" className="no-underline">
              <span className="text-sm text-darkColor">Syarat & Ketentuan Layanan</span>
            </LoadingLink>
            <LoadingLink to="/daftar-layanan" className="no-underline">
              <span className="text-sm text-darkColor">Daftar Layanan</span>
            </LoadingLink>
          </div>
          <div className="flex flex-1 flex-col">
            <span className="font-semibold text-lg mb-2">Akses Cepat</span>
            <LoadingLink to="/allreviews" className="no-underline">
              <span className="text-sm text-darkColor">Semua Review</span>
            </LoadingLink>
            <LoadingLink to="/blog" className="no-underline">
              <span className="text-sm text-darkColor">Blog</span>
            </LoadingLink>
          </div>
          <div className="flex flex-1 flex-col sm:col-span-1 col-span-2">
            <span className="font-semibold text-lg mb-2">Ketentuan</span>
            <LoadingLink to="/dukungan" className="no-underline">
              <span className="text-sm text-darkColor">Dukungan Pelanggan</span>
            </LoadingLink>
            <LoadingLink to="/term-and-conditional" className="no-underline">
              <span className="text-sm text-darkColor">Syarat & Ketentuan Layanan</span>
            </LoadingLink>
            <LoadingLink to="/privacy" className="no-underline">
              <span className="text-sm text-darkColor">Kebijakan Privasi</span>
            </LoadingLink>
          </div>
        </div>
        <div className="flex flex-row justify-between p-3 border-t-[1px] border-[#ffffff20]">
          <span className="text-sm opacity-70">COPYRIGHT © 2024 Diskominfo All rights Reserved</span>
          <span className="text-sm opacity-70">Hand-crafted & Made by TIM PMO</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
