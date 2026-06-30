import { vehicles, packages as pkgs } from './mock-data';
import { Vehicle, Package } from '../types';

export function getVehicle(vehicleId: string): Vehicle | undefined {
  return vehicles.find((v) => v.id === vehicleId);
}

export function getPackage(packageId: string): Package | undefined {
  return pkgs.find((p) => p.id === packageId);
}

export function getVehicleLabel(vehicleId: string): string {
  const v = getVehicle(vehicleId);
  return v ? `${v.make} ${v.model}` : 'Unbekannt';
}

export function getVehiclePlate(vehicleId: string): string {
  const v = getVehicle(vehicleId);
  return v?.licensePlate || '';
}

export function getPackageName(packageId: string): string {
  const p = getPackage(packageId);
  return p?.name || 'Unbekannt';
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return '–';
  const date = new Date(dateStr);
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
