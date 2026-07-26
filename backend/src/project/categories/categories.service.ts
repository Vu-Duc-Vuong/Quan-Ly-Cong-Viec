import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  private categories = [
    { id: 1, name: 'Công việc cá nhân', description: 'Việc vặt hàng ngày' },
    { id: 2, name: 'Công việc công ty', description: 'Dự án phần mềm' },
  ];

  findAll() {
    return this.categories;
  }

  create(dto: { name: string; description?: string }) {
    const newItem = { 
        id: Date.now(), 
        name: dto.name, 
        description: dto.description ?? ""
};
    this.categories.push(newItem);
    return newItem;
  }

  update(id: number, dto: { name: string; description?: string }) {
    const index = this.categories.findIndex(c => c.id === Number(id));
    if (index !== -1) {
      this.categories[index] = { ...this.categories[index], ...dto };
      return this.categories[index];
    }
    return null;
  }

  remove(id: number) {
    this.categories = this.categories.filter(c => c.id !== Number(id));
    return { success: true };
  }
}