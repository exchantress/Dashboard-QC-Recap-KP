import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState, useId } from 'react';
import { ChevronDownIcon, CircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import fatdata from '@/assets/wodummy.json'


export default function Formrekap() {
  // const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/');
  }
  const [dates, setDates] = useState({})
  const statusId = useId()
  return (
    <div className="flex flex-col items-center min-h-screen p-10">
      <Button onClick={handleBack} className="mb-4 self-start flex group" variant='ghost'>
        <SlArrowLeft className='transition-transform duration-150 group-hover:-translate-x-0.5'></SlArrowLeft>
        Back to Dashboard
      </Button>
      <div className="rounded-md border border-amber-700 shadow-md max-h-[80vh] overflow-y-auto w-full">
        <Table className='text-xs'>
          {/* <TableCaption>Striped rows table.</TableCaption> */}
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
              {/* <TableHead className='text-right'>Amount</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {fatdata.map(fat => (
              <TableRow key={fat.fat} className='odd:bg-muted/50 odd:hover:bg-muted/50 hover:bg-transparent *:border-border [&>:not(:last-child)]:border-r'>
                <TableCell className='font-medium'>{fat.fat}</TableCell>
                <TableCell>{fat.olt}</TableCell>
                <TableCell>{fat.tikor}</TableCell>
                <TableCell className="text-center">{fat.hc}</TableCell>
                <TableCell>
                  <Popover modal={false}>
                    <PopoverTrigger asChild>
                      <Button variant='outline' id='date' className='w-full justify-between font-normal'>
                        {dates[fat.fat]
                          ? new Date(dates[fat.fat]).toLocaleDateString()
                          : "Pick a date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={dates[fat.fat]}
                        onSelect={(date) =>
                          setDates(prev => ({
                            ...prev,
                            [fat.fat]: date,
                          }))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>
                  <Select defaultValue='1'>
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
                  <Textarea className='min-h-2 py-1.5' placeholder='Ket.  QC' />
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <RadioGroup className="flex items-center gap-3">
                      <label className="flex items-center gap-1 cursor-pointer text-xs">
                        <RadioGroupItem value="yes" className="border-green-300 text-green-300" />
                        <p>Yes</p>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer text-xs">
                        <RadioGroupItem value="no" className="border-red-300 text-red-300" />
                        <p>No</p>
                      </label>
                    </RadioGroup>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <RadioGroup className="flex items-center gap-3">
                      <label className="flex items-center gap-1 cursor-pointer text-xs">
                        <RadioGroupItem value="yes" className="border-green-300 text-green-300" />
                        <p>Yes</p>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer text-xs">
                        <RadioGroupItem value="no" className="border-red-300 text-red-300" />
                        <p>No</p>
                      </label>
                    </RadioGroup>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <RadioGroup className="flex items-center gap-3">
                      <label className="flex items-center gap-1 cursor-pointer text-xs">
                        <RadioGroupItem value="yes" className="border-green-300 text-green-300" />
                        <p>Yes</p>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer text-xs">
                        <RadioGroupItem value="no" className="border-red-300 text-red-300" />
                        <p>No</p>
                      </label>
                    </RadioGroup>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <RadioGroup className="flex items-center gap-3">
                      <label className="flex items-center gap-1 cursor-pointer text-xs">
                        <RadioGroupItem value="yes" className="border-green-300 text-green-300" />
                        <p>Yes</p>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer text-xs">
                        <RadioGroupItem value="no" className="border-red-300 text-red-300" />
                        <p>No</p>
                      </label>
                    </RadioGroup>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <RadioGroup className="flex items-center gap-3">
                      <label className="flex items-center gap-1 cursor-pointer text-xs">
                        <RadioGroupItem value="yes" className="border-green-300 text-green-300" />
                        <p>Yes</p>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer text-xs">
                        <RadioGroupItem value="no" className="border-red-300 text-red-300" />
                        <p>No</p>
                      </label>
                    </RadioGroup>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <RadioGroup className="flex items-center gap-3">
                      <label className="flex items-center gap-1 cursor-pointer text-xs">
                        <RadioGroupItem value="yes" className="border-green-300 text-green-300" />
                        <p>Yes</p>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer text-xs">
                        <RadioGroupItem value="no" className="border-red-300 text-red-300" />
                        <p>No</p>
                      </label>
                    </RadioGroup>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter className='bg-transparent'>
                    <TableRow className='hover:bg-transparent'>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className='text-right'>$2,500.00</TableCell>
                    </TableRow>
                </TableFooter> */}
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
              <AlertDialogAction onClick={handleBack}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}