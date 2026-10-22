import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/constants/routes';
import { Button } from '@/components/ui/Button';
import { useRegisterItem } from '@/features/officer/hooks/useRegisterItem';
import { ItemPhotoUploader, RegisterItemSuccess } from '@/features/officer/components';
import { RegisterItemSidebar } from '@/features/officer/components/RegisterItemSidebar';
import {
  RegistrationFields,
  RegistrationExtras,
} from '@/features/officer/components/RegistrationFields';
export function OfficerRegisterItemPage() {
  const navigate = useNavigate();
  const p = useRegisterItem();
  if (p.createdItem)
    return (
      <RegisterItemSuccess
        item={p.createdItem}
        onViewCatalog={() => navigate(RoutePaths.CATALOG)}
        onRecordAnother={p.resetForm}
        onViewInventory={() => navigate(RoutePaths.OFFICER_INVENTORY)}
      />
    );
  return (
    <div className="lf-stack">
      <div className="lf-page-intro">
        <h1 className="lf-title">Catat Barang</h1>
        <p>Catat barang yang sudah diterima secara fisik di pos.</p>
      </div>
      <div className="lf-register-grid">
        <form
          className="lf-stack lf-registration"
          noValidate
          onSubmit={async (e) => {
            e.preventDefault();
            await p.submit();
          }}
        >
          <div className="lf-surface lf-registration-main">
            <ItemPhotoUploader
              previewUrl={p.previewUrl}
              onPhotoSelect={p.handlePhotoSelect}
              onPhotoRemove={p.handlePhotoRemove}
              error={p.errors.photo}
            />
            <RegistrationFields form={p.formData} setForm={p.setFormData} errors={p.errors} />
          </div>
          <RegistrationExtras form={p.formData} setForm={p.setFormData} />
          <div className="lf-surface lf-receipt-check">
            <label htmlFor="physicallyReceived">
              <input
                type="checkbox"
                id="physicallyReceived"
                checked={p.formData.isPhysicallyReceived}
                onChange={(e) =>
                  p.setFormData((f) => ({ ...f, isPhysicallyReceived: e.target.checked }))
                }
              />
              <span>
                Saya memastikan barang fisik sudah diterima dan berada di pos petugas.
                <small>Centang setelah barang fisik diperiksa.</small>
              </span>
            </label>
            {p.errors.isPhysicallyReceived && (
              <p className="lf-field-error" role="alert">
                {p.errors.isPhysicallyReceived}
              </p>
            )}
          </div>
          {p.errors.form && (
            <p className="lf-field-error" role="alert">
              {p.errors.form}
            </p>
          )}
          <Button type="submit" isLoading={p.isSubmitting}>
            Konfirmasi &amp; Simpan Barang
          </Button>
        </form>
        <RegisterItemSidebar />
      </div>
    </div>
  );
}
