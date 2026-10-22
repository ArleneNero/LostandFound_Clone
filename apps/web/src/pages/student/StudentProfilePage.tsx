import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, GraduationCap } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RoutePaths } from '@/constants/routes';

export const StudentProfilePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto px-4 py-6 flex flex-col gap-6">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-[var(--lf-ink)]">Profil Mahasiswa</h1>
        <p className="text-xs lg:text-sm text-[var(--lf-muted)] mt-1">
          Identitas akun mahasiswa Universitas Budi Luhur
        </p>
      </div>

      <Card className="p-6 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[var(--lf-soft)] text-[var(--lf-blue)] flex items-center justify-center font-bold text-lg">
            <User className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--lf-ink)]">Nero Mahasiswa</h2>
            <p className="text-xs text-[var(--lf-muted)]">2411502194@student.budiluhur.ac.id</p>
            <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 bg-[var(--lf-soft)] text-[var(--lf-blue)] rounded-full text-[11px] font-semibold">
              <GraduationCap className="w-3 h-3" />
              <span>Fakultas Teknologi Informasi</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--lf-border)] flex justify-end">
          <Button
            variant="danger"
            size="sm"
            leftIcon={<LogOut className="w-4 h-4" />}
            onClick={() => navigate(RoutePaths.LANDING)}
          >
            Keluar Akun
          </Button>
        </div>
      </Card>
    </div>
  );
};
