import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { BankAccountService } from '@src/bank-account/bank-account.service';
import { CreateBankAccountDto, CreateBankAccountRequestDto } from '@src/bank-account/dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '@src/bank-account/dto/update-bank-account.dto';
import { JwtAuthGuard } from '@src/auth/jwt-auth.guard';
import { BankAccountSearchDto } from '@src/bank-account/dto/bank-account-search.dto';
import { AuthUser } from 'src/users/decorators/user.decorator';

@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) { }

  @Post('/add-bank-account')
  @UseGuards(JwtAuthGuard)
  create(@Body() createBankAccountDto: CreateBankAccountRequestDto, @AuthUser() user: any) {
    return this.bankAccountService.create(createBankAccountDto, user);
  }

  @Get('/list-bank-accounts')
  @UseGuards(JwtAuthGuard)
  findAll(@Query() search: BankAccountSearchDto) {
    return this.bankAccountService.findAll(search);
  }

  @Get('account/:_oid')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('_oid') _oid: string) {
    return this.bankAccountService.findOne(_oid);
  }

  @Patch('update/:_oid')
  @UseGuards(JwtAuthGuard)
  update(@Param('_oid') _oid: string, @Body() updateBankAccountDto: UpdateBankAccountDto) {
    return this.bankAccountService.update(_oid, updateBankAccountDto);
  }

  @Delete('delete/:_oid')
  @UseGuards(JwtAuthGuard)
  remove(@Param('_oid') _oid: string) {
    return this.bankAccountService.remove(_oid);
  }
}
