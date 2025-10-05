import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { BERITA } from '../data/berita';
import { CommonModule } from '@angular/common';
import { getAllKategori, Kategori } from '../data/kategori';

@Component({
  selector: 'app-detail-berita',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './detail-berita.page.html',
  styleUrls: ['./detail-berita.page.scss']
})
export class DetailBeritaPage {
  id: number | null = null;
  berita: any;

  kategoriList: Kategori[] = [];
  namaKategori: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : null;
    this.berita = BERITA.find(b => b.id === this.id);
    this.kategoriList = getAllKategori()

    if (this.berita?.idKategori?.length) {
      const kategori = this.kategoriList.find(
        (k) => k.id === this.berita.idKategori[0]
      );
      this.namaKategori = kategori ? kategori.nama : 'Tidak diketahui';
    }
  }

  getNamaKategori(id: number): string {
    const kategori = this.kategoriList.find((k) => k.id === id);
    return kategori ? kategori.nama : 'Tidak diketahui';
  }
}
