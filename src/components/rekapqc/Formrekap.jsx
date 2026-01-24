import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState, useId, useEffect } from 'react';
import { ChevronDownIcon, CircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate, useParams } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import { fetchFatform } from '@/utils/Services/Yohan/getFatform';
import { QCRadioGroup } from './Radiogroup';
import { submitQC } from '@/utils/Services/Yohan/putUpdateqc';
import { mapStatusToValue, mapValueToStatus } from './Handlermapvalue';

export default function Formrekap() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { woId } = useParams()
  const [state, setState] = useState({
    dates: {},
    formData: {},
    keterangan: {}
  })
  const statusId = useId()

  const fatQuery = useQuery({
    queryKey: ["fatdata", woId],
    queryFn: () => fetchFatform(woId),
    enabled: !!woId
  });

  useEffect(() => {
    if (fatQuery.data) {
      const initialFormData = {};
      const initialKeterangan = {};
      const initialDates = {};

      fatQuery.data.forEach(fat => {
        initialFormData[fat.fat] = {
          status: mapStatusToValue(fat.status),
          ganti_fat: fat.qc?.ganti_fat || '',
          ganti_splitter: fat.qc?.ganti_splitter || '',
          pembersihan_rx: fat.qc?.pembersihan_rx || '',
          perapihan: fat.qc?.perapihan || '',
          ganti_label: fat.qc?.ganti_label || '',
          penertiban: fat.qc?.penertiban || ''
        };
        initialKeterangan[fat.fat] = fat.keterangan || '';
        if (fat.tanggal) {
          initialDates[fat.fat] = new Date(fat.tanggal);
        }
      });

      function handleSetForm() {
        setState({
          formData: initialFormData,
          keterangan: initialKeterangan,
          dates: initialDates
        });
      }
      handleSetForm()
    }
  }, [fatQuery.data]);

  const formatDateLocal = (date) => {
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, "0")
    const dd = String(date.getDate()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}`
  }

  const buildPayload = () => {
    return {
      items: fatQuery.data.map(fat => ({
        fat_id: fat.fat,
        tanggal: state.dates[fat.fat]
          ? formatDateLocal(state.dates[fat.fat]) : "",
        status: mapValueToStatus(state.formData[fat.fat]?.status),
        keterangan: state.keterangan[fat.fat] || '',
        qc: {
          ganti_fat: state.formData[fat.fat]?.ganti_fat || '',
          ganti_splitter: state.formData[fat.fat]?.ganti_splitter || '',
          pembersihan_rx: state.formData[fat.fat]?.pembersihan_rx || '',
          perapihan: state.formData[fat.fat]?.perapihan || '',
          ganti_label: state.formData[fat.fat]?.ganti_label || '',
          penertiban: state.formData[fat.fat]?.penertiban || ''
        }
      }))
    }
  }

  const mutation = useMutation({
    mutationFn: submitQC,
    onSuccess: (data) => {
      alert(data.message)
      queryClient.invalidateQueries({ queryKey: ['summary'] })
      queryClient.invalidateQueries({ queryKey: ['wo'] })
      queryClient.invalidateQueries({ queryKey: ['fatdata', woId] })
      queryClient.invalidateQueries({ queryKey: ['fat'] })
      navigate('/')
    },
    onError: (error) => {
      alert(error.message)
    }
  })

  const handleSave = async () => {
    const payload = buildPayload()
    console.log("PAYLOAD DIKIRIM:", payload)
    mutation.mutate({ woId, payload })
  }

  const updateQC = (fatId, field, value) => {
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [fatId]: {
          ...prev.formData[fatId],
          [field]: value
        }
      }
    }))
  }

  const handleBack = () => {
    navigate('/');
  }

  if (fatQuery.isLoading) {
    return (
      <div className="flex flex-col items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen h-5/6 p-10">
      <Button onClick={handleBack} className="mb-4 self-start flex group" variant='ghost'>
        <SlArrowLeft className='transition-transform duration-150 group-hover:-translate-x-0.5'></SlArrowLeft>
        Back to Dashboard
      </Button>
      <h1 className='flex justify-center font-semibold'>Tabel {woId}</h1>
      <div className="rounded-md border border-amber-700 shadow-md max-h-[80vh] overflow-y-auto w-full">
        <Table className='text-xs'>
          <TableHeader>
            <TableRow className='hover:bg-transparent *:border-border [&>:not(:last-child)]:border-r'>
              <TableHead className='w-25'>FAT</TableHead>
              <TableHead>OLT</TableHead>
              <TableHead>TIKOR</TableHead>
              <TableHead>HC</TableHead>
              <TableHead>TANGGAL</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>KETERANGAN</TableHead>
              <TableHead>GANTI FAT?</TableHead>
              <TableHead>GANTI SPLITTER?</TableHead>
              <TableHead>PEMBERSIHAN RX?</TableHead>
              <TableHead>PERAPIHAN DW/DIST?</TableHead>
              <TableHead>GANTI LABEL?</TableHead>
              <TableHead>PENERTIBAN?</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(fatQuery.data ?? []).map(fat => (
              <TableRow key={fat.fat} className='odd:bg-muted/50 odd:hover:bg-muted/50 hover:bg-transparent *:border-border [&>:not(:last-child)]:border-r'>
                <TableCell className='font-medium'>{fat.fat}</TableCell>
                <TableCell>{fat.olt}</TableCell>
                <TableCell>{fat.tikor}</TableCell>
                <TableCell className="text-center">{fat.hc}</TableCell>
                <TableCell>
                  <Popover modal={false}>
                    <PopoverTrigger asChild>
                      <Button variant='outline' id='date' className='w-full justify-between font-normal'>
                        {state.dates[fat.fat]
                          ? new Date(state.dates[fat.fat]).toLocaleDateString()
                          : "Pick a date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={state.dates[fat.fat]}
                        onSelect={(date) => {
                          if (!date) return
                          setState(prev => ({
                            ...prev,
                            dates: {
                              ...prev.dates,
                              [fat.fat]: date
                            }
                          }))
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>
                  <Select value={state.formData[fat.fat]?.status || '1'} onValueChange={(value) => setState(prev => ({
                    ...prev,
                    formData: {
                      ...prev.formData,
                      [fat.fat]: { ...prev.formData[fat.fat], status: value }
                    }
                  }))}>
                    <SelectTrigger id={statusId} className='w-full flex items-center gap-2 shrink-0'>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent className="text-muted-foreground/80 pr-8 pl-2 right-2 left-auto flex items-center gap-2 shrink-0">
                      <SelectItem value='1'>
                        <span className='flex items-center gap-2'>
                          <CircleIcon className='size-2 fill-yellow-500 text-yellow-500' />
                          <span className='truncate'>In Progress</span>
                        </span>
                      </SelectItem>
                      <SelectItem value='2'>
                        <span className='flex items-center gap-2'>
                          <CircleIcon className='size-2 fill-green-500 text-green-500' />
                          <span className='truncate'>Approve</span>
                        </span>
                      </SelectItem>
                      <SelectItem value='3'>
                        <span className='flex items-center gap-2'>
                          <CircleIcon className='size-2 fill-red-500 text-red-500' />
                          <span className='truncate'>Reject</span>
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="max-w-xs w-1/2">
                  <Textarea
                    value={state.keterangan[fat.fat] || ''}
                    onChange={(e) => setState(prev => ({
                      ...prev,
                      keterangan: {
                        ...prev.keterangan,
                        [fat.fat]: e.target.value
                      }
                    }))}
                    className='min-h-2 py-1.5'
                    placeholder='Ket. QC'
                  />
                </TableCell>
                <TableCell>
                  <QCRadioGroup
                    value={state.formData[fat.fat]?.ganti_fat || ''}
                    onChange={(val) => updateQC(fat.fat, 'ganti_fat', val)}
                  />
                </TableCell>
                <TableCell>
                  <QCRadioGroup
                    value={state.formData[fat.fat]?.ganti_splitter || ''}
                    onChange={(val) => updateQC(fat.fat, 'ganti_splitter', val)}
                  />
                </TableCell>
                <TableCell>
                  <QCRadioGroup
                    value={state.formData[fat.fat]?.pembersihan_rx || ''}
                    onChange={(val) => updateQC(fat.fat, 'pembersihan_rx', val)}
                  />
                </TableCell>
                <TableCell>
                  <QCRadioGroup
                    value={state.formData[fat.fat]?.perapihan || ''}
                    onChange={(val) => updateQC(fat.fat, 'perapihan', val)}
                  />
                </TableCell>
                <TableCell>
                  <QCRadioGroup
                    value={state.formData[fat.fat]?.ganti_label || ''}
                    onChange={(val) => updateQC(fat.fat, 'ganti_label', val)}
                  />
                </TableCell>
                <TableCell>
                  <QCRadioGroup
                    value={state.formData[fat.fat]?.penertiban || ''}
                    onChange={(val) => updateQC(fat.fat, 'penertiban', val)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='w-full flex justify-end gap-4 mt-4'>
        <Button onClick={handleBack} variant='secondary'>Cancel</Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Save Changes</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSave}>
                {mutation.isPending && <Spinner />}
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}