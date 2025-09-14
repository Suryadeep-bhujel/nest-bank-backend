// import { IsOptional, IsString, IsNotEmpty, IsNumber } from 'class-validator';
// import { Type } from 'class-transformer';
// import { BranchManager } from 'src/branch-manager/entities/branch-manager.entity';
// import { Branch } from 'src/branch/entities/branch.entity';
// import { Staff } from 'src/staff/entities/staff.entity';
import { SearchRequestDto } from 'src/common/dto/SearchRequestDto';
export class SearchField {
    fieldName?: string;
    fieldValue?: string;
}
export class BranchSearchDto extends SearchRequestDto {
    // Add addition search parameters here specific to your use case in branch module search
}
